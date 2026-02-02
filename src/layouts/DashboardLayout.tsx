import type { ReactNode } from 'react';
import { Header } from '../components/Header';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-[1600px] mx-auto p-6 animate-fade-in">
        {children}
      </main>
    </div>
  );
}