'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export function LoadingSkeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-lg bg-muted',
                className
            )}
            {...props}
        />
    );
}

export function CardSkeleton() {
    return (
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <LoadingSkeleton className="h-4 w-24" />
            <LoadingSkeleton className="h-8 w-16" />
            <LoadingSkeleton className="h-3 w-32" />
        </div>
    );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="space-y-3">
            <LoadingSkeleton className="h-10 w-full" />
            {Array.from({ length: rows }).map((_, i) => (
                <LoadingSkeleton key={i} className="h-14 w-full" />
            ))}
        </div>
    );
}

export function DocumentCardSkeleton() {
    return (
        <div className="rounded-xl border border-border bg-card p-4 space-y-3">
            <LoadingSkeleton className="h-32 w-full rounded-lg" />
            <LoadingSkeleton className="h-4 w-3/4" />
            <div className="flex gap-2">
                <LoadingSkeleton className="h-5 w-16 rounded-full" />
                <LoadingSkeleton className="h-5 w-12 rounded-full" />
            </div>
            <LoadingSkeleton className="h-3 w-1/2" />
        </div>
    );
}

export function MessageSkeleton() {
    return (
        <div className="flex gap-3">
            <LoadingSkeleton className="h-8 w-8 rounded-full shrink-0" />
            <div className="space-y-2 flex-1">
                <LoadingSkeleton className="h-4 w-3/4" />
                <LoadingSkeleton className="h-4 w-1/2" />
                <LoadingSkeleton className="h-4 w-5/6" />
            </div>
        </div>
    );
}
