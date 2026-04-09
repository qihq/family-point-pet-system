import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role, TransactionType, SourceType } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest){
  try{
    const authHeader = request.headers.get('authorization');
    const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
    if(!token) return NextResponse.json({ success:false, error:'未登录' }, { status:401 });
    const payload = await verifyToken(token);
    if(!payload) return NextResponse.json({ success:false, error:'登录已失效' }, { status:401 });

    const url = new URL(request.url);
    const childId = url.searchParams.get('childId'); // id or null or 'all'
    const type = url.searchParams.get('type') as TransactionType | null; // 'earn'|'spend'|null
    const sourceType = url.searchParams.get('sourceType') as SourceType | null;
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    const format = url.searchParams.get('format');

    // collect children within family
    const children = await prisma.user.findMany({ where: { familyId: payload.familyId, role: Role.child }, select:{ id:true, name:true } });
    const ids = (childId && childId !== 'all') ? children.filter(c=>c.id===childId).map(c=>c.id) : children.map(c=>c.id);
    if(ids.length===0) return NextResponse.json({ success:true, data:{ transactions: [] } });

    const accounts = await prisma.pointAccount.findMany({ where: { childId: { in: ids } }, select:{ id:true, childId:true } });
    const accountByChild: Record<string,string> = Object.fromEntries(accounts.map(a=>[a.childId, a.id]));
    const where:any = { accountId: { in: accounts.map(a=>a.id) } };
    if(type) where.type = type;
    if(sourceType) where.sourceType = sourceType;
    if(startDate || endDate){ where.createdAt = {}; if(startDate) where.createdAt.gte = new Date(startDate); if(endDate) where.createdAt.lte = new Date(endDate); }

    const txs = await prisma.pointTransaction.findMany({ where, orderBy: { createdAt:'desc' } });
    const nameById: Record<string,string> = Object.fromEntries(children.map(c=>[c.id, c.name]));

    const rows = txs.map(t=>({
      id: t.id,
      createdAt: t.createdAt,
      type: t.type,
      sourceType: t.sourceType,
      amount: t.amount,
      balanceAfter: t.balanceAfter,
      description: t.description || '',
      childId: Object.keys(accountByChild).find(cid => accountByChild[cid] === t.accountId) || '',
      childName: nameById[Object.keys(accountByChild).find(cid => accountByChild[cid] === t.accountId) || ''] || ''
    }));

        if (format === 'csv') {
      const bom = '\uFEFF';
      const EOL = '\r\n';
      const header = ['childId','childName','createdAt','type','sourceType','amount','balanceAfter','description'].join(',') + EOL;
      const body = rows.map(r => [
        r.childId,
        escapeCsv(r.childName),
        new Date(r.createdAt).toISOString(),
        r.type,
        r.sourceType,
        r.amount,
        r.balanceAfter,
        escapeCsv(r.description || '')
      ].join(',')).join(EOL);
      const csv = bom + header + body + EOL;
      return new NextResponse(csv, { headers: { 'Content-Type':'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename=points_report_${Date.now()}.csv` } });
    }

    return NextResponse.json({ success:true, data: { transactions: rows } });
  }catch(e:any){
    console.error('生成报告失败', e);
    return NextResponse.json({ success:false, error: e.message || '服务异常' }, { status:500 });
  }
}

function escapeCsv(s:string){
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
    return '"' + s.replace(/"/g,'""') + '"';
  }
  return s;
}
