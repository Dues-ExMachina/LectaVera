'use client';

import React from 'react';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { RecentSessions } from '@/components/dashboard/recent-sessions';
import { QuickActions } from '@/components/dashboard/quick-actions';

export default function DashboardPage() {
    const { user } = useAuth();
    const firstName = user?.full_name?.split(' ')[0] || 'Scholar';

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-serif">
                    Welcome back, {firstName}!
                </h1>
                <p className="text-muted-foreground mt-1">
                    {format(new Date(), "EEEE, MMMM d, yyyy 'at' h:mm a")}
                </p>
            </div>

            {/* Stats Cards */}
            <DashboardStats />

            {/* Quick Actions */}
            <QuickActions />

            {/* Recent Sessions */}
            <RecentSessions />
        </div>
    );
}
