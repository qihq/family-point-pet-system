export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  return new Response(JSON.stringify({ success: false, error: 'Use PATCH with isDeleted=false to restore' }), {
    status: 501,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST() {
  return new Response(JSON.stringify({ success: false, error: 'Use PATCH with isDeleted=false to restore' }), {
    status: 501,
    headers: { 'Content-Type': 'application/json' },
  });
}

