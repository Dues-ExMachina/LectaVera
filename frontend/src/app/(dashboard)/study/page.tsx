'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Brain, MessageCircle, Clock, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/shared/empty-state';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { StudyMode } from '@/types';

const modeDetails: Record<StudyMode, { label: string; desc: string; color: string }> = {
    answer: { label: 'Answer', desc: 'Get precise answers with citations', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    summarize: { label: 'Summarize', desc: 'Create cheat sheets and summaries', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    deep_dive: { label: 'Deep Dive', desc: 'Combine notes + web research', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
};

// Mock data
const mockSessions = [
    { id: '1', title: 'Calculus Derivatives Review', mode: 'answer' as StudyMode, document_ids: ['1'], message_count: 12, created_at: '2025-01-16T10:30:00Z', documents: [{ filename: 'Calculus_Textbook.pdf' }] },
    { id: '2', title: 'Biology Cell Structure', mode: 'summarize' as StudyMode, document_ids: ['2'], message_count: 8, created_at: '2025-01-15T14:00:00Z', documents: [{ filename: 'Biology_101.pdf' }] },
    { id: '3', title: 'WW2 Deep Analysis', mode: 'deep_dive' as StudyMode, document_ids: ['3'], message_count: 15, created_at: '2025-01-14T09:00:00Z', documents: [{ filename: 'World_History_Notes.pdf' }] },
];

const mockDocuments = [
    { id: '1', filename: 'Calculus_Textbook.pdf', category: 'MATH' },
    { id: '2', filename: 'Biology_101.pdf', category: 'SCIENCE' },
    { id: '3', filename: 'World_History_Notes.pdf', category: 'HISTORY' },
    { id: '4', filename: 'Python_Programming.pdf', category: 'COMPUTER_SCIENCE' },
    { id: '5', filename: 'Organic_Chemistry.pdf', category: 'SCIENCE' },
];

export default function StudyListPage() {
    const router = useRouter();
    const [showNewSession, setShowNewSession] = useState(false);
    const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
    const [selectedMode, setSelectedMode] = useState<StudyMode>('answer');

    const handleCreateSession = () => {
        if (selectedDocs.length === 0) return;
        // In real app, this would call createSession mutation
        router.push('/study/new-session-id');
        setShowNewSession(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-serif">Study Sessions</h1>
                    <p className="text-muted-foreground mt-1">Review and continue your learning</p>
                </div>
                <Button
                    onClick={() => setShowNewSession(true)}
                    className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white"
                >
                    <Plus className="mr-2 h-4 w-4" /> New Session
                </Button>
            </div>

            {mockSessions.length === 0 ? (
                <EmptyState
                    icon={<Brain className="h-12 w-12 text-muted-foreground/50" />}
                    title="No study sessions yet"
                    description="Start a new session to begin learning"
                    action={{ label: 'New Session', onClick: () => setShowNewSession(true) }}
                />
            ) : (
                <div className="grid gap-4">
                    {mockSessions.map((session) => (
                        <Card
                            key={session.id}
                            className="cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5"
                            onClick={() => router.push(`/study/${session.id}`)}
                        >
                            <CardContent className="p-5 flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="font-semibold">{session.title}</h3>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <span>{format(new Date(session.created_at), 'MMM d, yyyy h:mm a')}</span>
                                        <span className="flex items-center gap-1">
                                            <MessageCircle className="h-3.5 w-3.5" /> {session.message_count} messages
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant="secondary" className={modeDetails[session.mode].color}>
                                        {modeDetails[session.mode].label}
                                    </Badge>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                        onClick={(e) => { e.stopPropagation(); }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* New Session Dialog */}
            <Dialog open={showNewSession} onOpenChange={setShowNewSession}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="font-serif">New Study Session</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                        <div>
                            <Label className="text-sm font-semibold mb-3 block">Select Documents</Label>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {mockDocuments.map((doc) => (
                                    <label key={doc.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                                        <Checkbox
                                            checked={selectedDocs.includes(doc.id)}
                                            onCheckedChange={(checked) => {
                                                setSelectedDocs(checked
                                                    ? [...selectedDocs, doc.id]
                                                    : selectedDocs.filter((id) => id !== doc.id)
                                                );
                                            }}
                                        />
                                        <span className="text-sm">{doc.filename}</span>
                                    </label>
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">{selectedDocs.length} documents selected</p>
                        </div>

                        <div>
                            <Label className="text-sm font-semibold mb-3 block">Choose Mode</Label>
                            <div className="grid grid-cols-3 gap-3">
                                {(Object.entries(modeDetails) as [StudyMode, typeof modeDetails[StudyMode]][]).map(([mode, details]) => (
                                    <button
                                        key={mode}
                                        type="button"
                                        onClick={() => setSelectedMode(mode)}
                                        className={cn(
                                            'rounded-xl border-2 p-3 text-center transition-all',
                                            selectedMode === mode
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border hover:border-primary/30'
                                        )}
                                    >
                                        <p className="text-sm font-medium">{details.label}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{details.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowNewSession(false)}>Cancel</Button>
                        <Button
                            onClick={handleCreateSession}
                            disabled={selectedDocs.length === 0}
                            className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white"
                        >
                            Start Session
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
