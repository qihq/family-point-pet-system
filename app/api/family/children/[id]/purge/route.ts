export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST() {
  return new Response(JSON.stringify({ success: false, error: 'Use DELETE on child to purge or mark as deleted' }), {
    status: 501,
    headers: { 'Content-Type': 'application/json' },
  });
}


