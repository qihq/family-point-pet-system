import FixMojibakeClient from '@/components/FixMojibakeClient';
import type { Metadata } from 'next';
import './globals.css';

export const dynamic = 'force-dynamic';
export const revalidate = 0;


import Topbar from '@/components/topbar';

export const metadata: Metadata = {
  title: '家庭积分宠物系统',
  description: '通过完成任务赚取积分，照顾虚拟宠物成长',
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>
        <Topbar />
        {/* Auto-fix common mojibake in UI for test builds */}
        <FixMojibakeClient />
        <div className="pt-12">{children}</div>
      </body>
    </html>
  );
}


