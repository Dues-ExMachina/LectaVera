'use client';

import React from 'react';
import { BarChart3, TrendingUp, Clock, Target, BookOpen, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Mock data for analytics
const overviewStats = [
    { label: 'Total Study Time', value: '42h 30m', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
    { label: 'Questions Asked', value: '256', icon: MessageCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
    { label: 'Quiz Avg Score', value: '76%', icon: Target, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
    { label: 'Documents Studied', value: '18', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/30' },
];

const weeklyActivity = [
    { day: 'Mon', questions: 12, minutes: 45 },
    { day: 'Tue', questions: 8, minutes: 30 },
    { day: 'Wed', questions: 15, minutes: 55 },
    { day: 'Thu', questions: 5, minutes: 20 },
    { day: 'Fri', questions: 20, minutes: 70 },
    { day: 'Sat', questions: 10, minutes: 35 },
    { day: 'Sun', questions: 3, minutes: 15 },
];

const weakAreas = [
    { topic: 'Organic Chemistry Reactions', score: 45, category: 'SCIENCE', suggestions: 'Review Chapter 5' },
    { topic: 'Integration by Parts', score: 52, category: 'MATH', suggestions: 'Practice more examples' },
    { topic: 'World War II Causes', score: 58, category: 'HISTORY', suggestions: 'Re-read pages 12-18' },
    { topic: 'Binary Search Trees', score: 65, category: 'COMPUTER_SCIENCE', suggestions: 'Try coding exercises' },
];

const studyCalendar = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    studied: Math.random() > 0.3,
    minutes: Math.random() > 0.3 ? Math.floor(Math.random() * 90 + 10) : 0,
}));

export default function AnalyticsPage() {
    const maxMinutes = Math.max(...weeklyActivity.map((d) => d.minutes));

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-serif">Analytics</h1>
                <p className="text-muted-foreground mt-1">Track your learning progress and identify areas for improvement</p>
            </div>

            {/* Overview Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {overviewStats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.label}>
                            <CardContent className="p-5 flex items-center gap-4">
                                <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', stat.bg)}>
                                    <Icon className={cn('h-6 w-6', stat.color)} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Weekly Activity Chart */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" /> Weekly Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-end gap-2 h-48">
                        {weeklyActivity.map((day) => (
                            <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                                <div className="w-full flex flex-col items-center gap-1 flex-1 justify-end">
                                    <span className="text-xs text-muted-foreground">{day.minutes}m</span>
                                    <div
                                        className="w-full rounded-t-lg bg-gradient-to-t from-[#1E3A8A] to-[#3B82F6] min-h-[4px] transition-all"
                                        style={{ height: `${(day.minutes / maxMinutes) * 100}%` }}
                                    />
                                </div>
                                <span className="text-xs text-muted-foreground font-medium">{day.day}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Two-column layout */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Weak Areas */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5" /> Areas for Improvement
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {weakAreas.map((area) => (
                            <div key={area.topic} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">{area.topic}</span>
                                        <Badge variant="secondary" className="text-xs">{area.category.replace('_', ' ')}</Badge>
                                    </div>
                                    <span className={cn('text-sm font-bold', area.score < 50 ? 'text-red-500' : area.score < 70 ? 'text-amber-500' : 'text-emerald-500')}>
                                        {area.score}%
                                    </span>
                                </div>
                                <Progress value={area.score} className="h-2" />
                                <p className="text-xs text-muted-foreground">💡 {area.suggestions}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Study Calendar */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" /> Study Calendar
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-7 gap-1.5">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                                <div key={d} className="text-center text-xs text-muted-foreground font-medium py-1">{d}</div>
                            ))}
                            {/* Padding for first day */}
                            {Array.from({ length: 2 }).map((_, i) => (
                                <div key={`pad-${i}`} />
                            ))}
                            {studyCalendar.map((day) => (
                                <div
                                    key={day.day}
                                    className={cn(
                                        'aspect-square rounded-md flex items-center justify-center text-xs font-medium transition-colors',
                                        day.studied
                                            ? day.minutes > 60
                                                ? 'bg-emerald-500 text-white'
                                                : day.minutes > 30
                                                    ? 'bg-emerald-400 text-white'
                                                    : 'bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200'
                                            : 'bg-muted text-muted-foreground'
                                    )}
                                    title={day.studied ? `${day.minutes} min` : 'No study'}
                                >
                                    {day.day}
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                            <span>Less</span>
                            <div className="flex gap-1">
                                <div className="h-3 w-3 rounded bg-muted" />
                                <div className="h-3 w-3 rounded bg-emerald-200 dark:bg-emerald-800" />
                                <div className="h-3 w-3 rounded bg-emerald-400" />
                                <div className="h-3 w-3 rounded bg-emerald-500" />
                            </div>
                            <span>More</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
