'use client';

import React, { useState } from 'react';
import { Plus, LayoutGrid, List, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { DocumentGrid } from '@/components/bookshelf/document-grid';
import { UploadModal } from '@/components/bookshelf/upload-modal';
import { cn } from '@/lib/utils';

const categories = [
    'All',
    'MATH',
    'SCIENCE',
    'HISTORY',
    'LITERATURE',
    'COMPUTER_SCIENCE',
    'ENGINEERING',
    'BUSINESS',
    'MEDICINE',
    'LAW',
    'OTHER',
];

export default function BookshelfPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [sortBy, setSortBy] = useState('newest');
    const [uploadOpen, setUploadOpen] = useState(false);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-serif">My Bookshelf</h1>
                    <p className="text-muted-foreground mt-1">Manage your study documents</p>
                </div>
                <Button
                    onClick={() => setUploadOpen(true)}
                    className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Upload Document
                </Button>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search documents..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-[160px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                                {cat === 'All' ? 'All Categories' : cat.replace('_', ' ')}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="name_asc">Name A-Z</SelectItem>
                        <SelectItem value="name_desc">Name Z-A</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex gap-1 ml-auto">
                    <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="icon"
                        onClick={() => setViewMode('grid')}
                        className={cn(viewMode === 'grid' && 'bg-primary text-primary-foreground')}
                    >
                        <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="icon"
                        onClick={() => setViewMode('list')}
                        className={cn(viewMode === 'list' && 'bg-primary text-primary-foreground')}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Document Grid */}
            <DocumentGrid viewMode={viewMode} searchQuery={searchQuery} category={category} />

            {/* Upload Modal */}
            <UploadModal open={uploadOpen} onOpenChange={setUploadOpen} />
        </div>
    );
}
