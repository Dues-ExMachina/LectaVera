'use client';

import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageCircle, Clock, ArrowRight } from 'lucide-react';

// Mock data
const recentSessions = [
    {
        id: '1',
        title: 'Calculus Derivatives Review',
        date: new Date(Date.now() - 1000 * 60 * 30),
        questions: 12,
        duration: '23 min',
    },
    {
        id: '2',
        title: 'Biology Cell Structure',
        date: new Date(Date.now() - 1000 * 60 * 60 * 3),
        questions: 8,
        duration: '15 min',
    },
    {
        id: '3',
        title: 'World History - WW2',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24),
        questions: 15,
        duration: '35 min',
    },
    {
        id: '4',
        title: 'Python Data Structures',
        date: new Date(Date.now() - 1000 * 60 * 60 * 48),
        questions: 6,
        duration: '18 min',
    },
    {
        id: '5',
        title: 'Organic Chemistry Review',
        date: new Date(Date.now() - 1000 * 60 * 60 * 72),
        questions: 20,
        duration: '45 min',
    },
];

export function RecentSessions() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">Recent Study Sessions</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/study" className="text-primary">
                        View All <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="divide-y divide-border">
                    {recentSessions.map((session) => (
                        <Link
                            key={session.id}
                            href={`/study/${session.id}`}
                            className="flex items-center justify-between py-3 hover:bg-muted/50 -mx-4 px-4 rounded-lg transition-colors"
                        >
                            <div className="space-y-1">
                                <p className="text-sm font-medium">{session.title}</p>
                                <p className="text-xs text-muted-foreground">
                                    {format(session.date, 'MMM d, yyyy h:mm a')}
                                </p>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <MessageCircle className="h-3.5 w-3.5" />
                                    {session.questions} questions
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    {session.duration}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
