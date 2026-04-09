"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// 极简 Tabs 组件，避免外部依赖缺失导致的编译失败
function Tabs({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (t: string)=>void }){
  return (
    <div className="inline-flex gap-1 bg-white/80 backdrop-blur rounded-lg p-1 border border-gray-200">
      {tabs.map(t => (
        <button key={t}
          onClick={()=>onChange(t)}
          className={`px-3 py-1.5 rounded-md text-sm ${active===t? 'bg-amber-100 text-amber-800 font-medium' : 'hover:bg-gray-100 text-gray-700'}`}
        >{t}</button>
      ))}
    </div>
  );
}

// 简化类型，确保页面先稳定编译
type Rule = any;
type Kid  = { id: string; name: string; avatarUrl?: string };

export default function ParentHome(){
  const router = useRouter();
  const [tab, setTab] = useState<'规则'|'孩子'|'宠物'|'报告'>('规则');
  const [pendingCount, setPendingCount] = useState<number>(0);

  const [rules, setRules] = useState<Rule[]>([]);
  const [kids, setKids] = useState<Kid[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const tabs = useMemo(()=>['规则','孩子','宠物','报告'] as const, []);

  async function refreshPending(){
    try{
      const r = await fetch('/api/point-records?status=pending&pageSize=1', { cache:'no-store', credentials:'include' });
      const d = await r.json().catch(()=>null);
      const total = d?.data?.pagination?.total ?? 0;
      setPendingCount(Number(total)||0);
    }catch{ setPendingCount(0); }
  }

  async function loadRules(){
    setLoading(true); setError("");
    try{
      const r = await fetch('/api/point-rules', { cache:'no-store', credentials:'include' });
      const d = await r.json();
      if(r.ok && d.success){ setRules(d.data.rules||[]); } else { setError(d.error||'获取规则失败'); }
    }catch{ setError('网络错误'); } finally{ setLoading(false); }
  }

  async function loadKids(){
    setLoading(true); setError("");
    try{
      const r = await fetch('/api/family/children', { cache:'no-store', credentials:'include' });
      const d = await r.json();
      if(r.ok && d.success){ setKids(d.data||[]); } else { setError(d.error||'获取孩子列表失败'); }
    }catch{ setError('网络错误'); } finally{ setLoading(false); }
  }

  useEffect(()=>{ refreshPending(); }, []);
  useEffect(()=>{
    if(tab==='规则') loadRules();
    if(tab==='孩子' || tab==='宠物') loadKids();
    // 报告页仅做导航，不预取
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--text)]">家长首页</h1>
          <Tabs tabs={tabs as unknown as string[]} active={tab} onChange={(t)=>setTab(t as any)} />
        </div>

        {pendingCount>0 && (
          <a href="/parent/review" className="block w-full text-left px-4 py-3 rounded-lg bg-orange-50 border border-orange-200 text-orange-800">
            有 <span className="font-semibold">{pendingCount}</span> 条待审核记录，点击前往审核
          </a>
        )}

        {/* 规则 */}
        {tab==='规则' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">积分规则</h2>
                <p className="text-sm text-[var(--muted)]">管理家庭积分规则，配置孩子可执行任务</p>
              </div>
              <div className="flex items-center gap-2">
                <a href="/parent" className="bg-gray-100 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-200">返回主页</a>
                <button onClick={()=>router.push('/parent/point-rules')} className="px-3 py-2 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-600)]">规则管理</button>
              </div>
            </div>
            {loading? (<div className="p-6 text-gray-500">加载中…</div>) : error? (<div className="p-6 text-red-600">{error}</div>) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs text-gray-500">规则名称</th>
                      <th className="px-6 py-3 text-left text-xs text-gray-500">分类</th>
                      <th className="px-6 py-3 text-left text-xs text-gray-500">积分</th>
                      <th className="px-6 py-3 text-left text-xs text-gray-500">状态</th>
                      <th className="px-6 py-3 text-left text-xs text-gray-500">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {rules.length===0? (
                      <tr><td colSpan={5} className="px-6 py-6 text-center text-gray-500">暂无规则，点击右上角“规则管理”新建</td></tr>
                    ) : rules.map((r: any)=>(
                      <tr key={r.id} className="hover:bg-gray-50">
                        <td className="px-6 py-3 text-sm text-gray-900">{r.name}</td>
                        <td className="px-6 py-3 text-sm text-gray-600">{r.category}</td>
                        <td className="px-6 py-3 text-sm text-gray-900">{r.pointsType==='range'? `${r.pointsMin||0}~${r.pointsMax||0}` : `+${r.points}`}</td>
                        <td className="px-6 py-3 text-sm">{r.enabled? '启用' : '禁用'}</td>
                        <td className="px-6 py-3 text-sm text-blue-600"><a href={`/parent/point-rules?edit=${r.id}`}>编辑</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 孩子 */}
        {tab==='孩子' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold">孩子管理</h2>
              <a href="/parent/children" className="px-3 py-2 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-600)]">进入管理页</a>
            </div>
            {loading? (<div className="p-6 text-gray-500">加载中…</div>) : error? (<div className="p-6 text-red-600">{error}</div>) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                {kids.map(k=> (
                  <div key={k.id} className="border rounded-lg p-4 flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="avatar" src={k.avatarUrl||'/avatar.png'} className="w-10 h-10 rounded-full object-cover"/>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{k.name}</div>
                      <div className="text-xs text-gray-500">ID: {k.id}</div>
                    </div>
                    <a className="text-blue-600 text-sm" href={`/parent/children?edit=${k.id}`}>编辑</a>
                  </div>
                ))}
                {kids.length===0 && (<div className="text-gray-500">暂无孩子，请在“孩子管理”添加</div>)}
              </div>
            )}
          </div>
        )}

        {/* 宠物：先给出导航，避免页面内复杂编辑造成再次语法错误 */}
        {tab==='宠物' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold">宠物管理</h2>
              <div className="text-sm text-gray-600">前往孩子端宠物页查看：/child/pet</div>
            </div>
            <div className="p-6 text-gray-700">此处后续可继续聚合每个孩子的 3D 宠物设置与模型上传入口。</div>
          </div>
        )}

        {/* 报告 */}
        {tab==='报告' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold">报告</h2>
              <a href="/parent/report" className="px-3 py-2 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-600)]">进入报告页</a>
            </div>
            <div className="p-6 text-gray-700">可在报告页筛选时间范围、类型并导出 CSV。</div>
          </div>
        )}
      </div>
    </div>
  );
}