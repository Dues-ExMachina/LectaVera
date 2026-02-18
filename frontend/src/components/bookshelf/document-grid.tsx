'use client';

import React from 'react';
import { FileText, MoreVertical, CheckCircle, Loader2, XCircle, Trash2, Edit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EmptyState } from '@/components/shared/empty-state';
import { cn } from '@/lib/utils';
import type { DocumentStatus, DocumentCategory } from '@/types';

const categoryColors: Record<string, string> = {
    MATH: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    SCIENCE: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    HISTORY: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    LITERATURE: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    COMPUTER_SCIENCE: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
    ENGINEERING: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    BUSINESS: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    MEDICINE: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    LAW: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    OTHER: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
};

function StatusBadge({ status }: { status: DocumentStatus }) {
    switch (status) {
        case 'READY':
            return (
                <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="h-3.5 w-3.5" /> Ready
                </span>
            );
        case 'PROCESSING':
            return (
                <span className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Processing...
                </span>
            );
        case 'FAILED':
            return (
                <span className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                    <XCircle className="h-3.5 w-3.5" /> Failed
                </span>
            );
    }
}

// Mock documents
const mockDocuments = [
    { id: '1', filename: 'Calculus_Textbook.pdf', category: 'MATH' as DocumentCategory, tags: ['calculus', 'derivatives'], page_count: 342, file_size: 15200000, status: 'READY' as DocumentStatus, is_archived: false, uploaded_at: '2025-01-15T10:00:00Z', updated_at: '2025-01-15T10:00:00Z' },
    { id: '2', filename: 'Biology_101.pdf', category: 'SCIENCE' as DocumentCategory, tags: ['biology', 'cells'], page_count: 128, file_size: 8400000, status: 'READY' as DocumentStatus, is_archived: false, uploaded_at: '2025-01-14T08:00:00Z', updated_at: '2025-01-14T08:00:00Z' },
    { id: '3', filename: 'World_History_Notes.pdf', category: 'HISTORY' as DocumentCategory, tags: ['history', 'ww2'], page_count: 56, file_size: 3200000, status: 'PROCESSING' as DocumentStatus, is_archived: false, uploaded_at: '2025-01-16T12:00:00Z', updated_at: '2025-01-16T12:00:00Z' },
    { id: '4', filename: 'Python_Programming.pdf', category: 'COMPUTER_SCIENCE' as DocumentCategory, tags: ['python', 'programming'], page_count: 280, file_size: 12100000, status: 'READY' as DocumentStatus, is_archived: false, uploaded_at: '2025-01-13T09:00:00Z', updated_at: '2025-01-13T09:00:00Z' },
    { id: '5', filename: 'Organic_Chemistry.pdf', category: 'SCIENCE' as DocumentCategory, tags: ['chemistry', 'organic'], page_count: 198, file_size: 9800000, status: 'READY' as DocumentStatus, is_archived: false, uploaded_at: '2025-01-12T14:00:00Z', updated_at: '2025-01-12T14:00:00Z' },
    { id: '6', filename: 'Machine_Learning_Intro.pdf', category: 'COMPUTER_SCIENCE' as DocumentCategory, tags: ['ml', 'ai'], page_count: 96, file_size: 5600000, status: 'FAILED' as DocumentStatus, is_archived: false, uploaded_at: '2025-01-16T15:00:00Z', updated_at: '2025-01-16T15:00:00Z' },
];

interface DocumentGridProps {
    viewMode: 'grid' | 'list';
    searchQuery: string;
    category: string;
}

export function DocumentGrid({ viewMode, searchQuery, category }: DocumentGridProps) {
    const filtered = mockDocuments.filter((doc) => {
        const matchesSearch = doc.filename.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = category === 'All' || doc.category === category;
        return matchesSearch && matchesCategory;
    });

    if (filtered.length === 0) {
        return (
            <EmptyState
                title="Your bookshelf is empty"
                description="Upload your first PDF to get started"
                action={{ label: 'Upload Document', onClick: () => { } }}
            />
        );
    }

    if (viewMode === 'list') {
        return (
            <div className="divide-y divide-border rounded-xl border border-border">
                {filtered.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">{doc.filename}</p>
                                <p className="text-xs text-muted-foreground">{doc.page_count} pages · {(doc.file_size / 1024 / 1024).toFixed(1)} MB</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge variant="secondary" className={cn('text-xs', categoryColors[doc.category])}>
                                {doc.category.replace('_', ' ')}
                            </Badge>
                            <StatusBadge status={doc.status} />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((doc) => (
                <Card
                    key={doc.id}
                    className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                    <CardContent className="p-4">
                        {/* Thumbnail placeholder */}
                        <div className="flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-muted to-muted/50 mb-3">
                            <FileText className="h-12 w-12 text-muted-foreground/40" />
                        </div>

                        {/* Filename */}
                        <p className="text-sm font-medium truncate mb-1" title={doc.filename}>
                            {doc.filename}
                        </p>

                        {/* Category & Status */}
                        <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className={cn('text-xs', categoryColors[doc.category])}>
                                {doc.category.replace('_', ' ')}
                            </Badge>
                            <StatusBadge status={doc.status} />
                        </div>

                        {/* Meta */}
                        <p className="text-xs text-muted-foreground">
                            {doc.page_count} pages · {(doc.file_size / 1024 / 1024).toFixed(1)} MB
                        </p>

                        {/* Actions (appear on hover) */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
