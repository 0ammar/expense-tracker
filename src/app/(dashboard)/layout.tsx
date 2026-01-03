'use client';

import { SessionProvider } from 'next-auth/react';
import { Header } from '@/components';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="dashboard-layout">
        <Header />
        <main className="dashboard-layout__main">{children}</main>
      </div>
    </SessionProvider>
  );
}