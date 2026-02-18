'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { useUIStore } from '@/store/ui-store';
import { cn } from '@/lib/utils';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { sidebarCollapsed } = useUIStore();

    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar - hidden on mobile */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Main content */}
            <div
                className={cn(
                    'flex flex-col transition-all duration-300',
                    sidebarCollapsed ? 'md:ml-[68px]' : 'md:ml-[256px]'
                )}
            >
                <Topbar />
                <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
