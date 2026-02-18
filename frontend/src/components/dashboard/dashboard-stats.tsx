'use client';

import React from 'react';
import { BookOpen, MessageCircle, BarChart3, Flame, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Mock data – replace with useDashboardStats() hook when backend is ready
const stats = [
    {
        label: 'Documents in Library',
        value: 24,
        trend: '+3 this week',
        trendUp: true,
        icon: BookOpen,
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
        label: 'Questions This Week',
        value: 47,
        trend: '↑ 12% from last week',
        trendUp: true,
        icon: MessageCircle,
        color: 'from-emerald-500 to-emerald-600',
        bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    },
    {
        label: 'Average Quiz Score',
        value: '78%',
        trend: 'Above average',
        trendUp: true,
        icon: BarChart3,
        color: 'from-amber-500 to-amber-600',
        bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    },
    {
        label: 'Day Study Streak',
        value: 12,
        trend: 'Keep it up! 🔥',
        trendUp: true,
        icon: Flame,
        color: 'from-rose-500 to-rose-600',
        bgColor: 'bg-rose-50 dark:bg-rose-950/30',
    },
];

export function DashboardStats() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <Card
                        key={stat.label}
                        className="relative overflow-hidden border-border/50 hover:shadow-md transition-shadow"
                    >
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                                    <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                                    <div className="flex items-center gap-1">
                                        {stat.trendUp ? (
                                            <TrendingUp className="h-3 w-3 text-emerald-500" />
                                        ) : (
                                            <TrendingDown className="h-3 w-3 text-red-500" />
                                        )}
                                        <span
                                            className={cn(
                                                'text-xs',
                                                stat.trendUp ? 'text-emerald-500' : 'text-red-500'
                                            )}
                                        >
                                            {stat.trend}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className={cn(
                                        'flex h-11 w-11 items-center justify-center rounded-xl',
                                        stat.bgColor
                                    )}
                                >
                                    <Icon
                                        className={cn(
                                            'h-5 w-5 bg-gradient-to-br bg-clip-text',
                                            stat.color === 'from-blue-500 to-blue-600' && 'text-blue-500',
                                            stat.color === 'from-emerald-500 to-emerald-600' && 'text-emerald-500',
                                            stat.color === 'from-amber-500 to-amber-600' && 'text-amber-500',
                                            stat.color === 'from-rose-500 to-rose-600' && 'text-rose-500'
                                        )}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
