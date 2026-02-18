'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { ClipboardList, Loader2, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Difficulty } from '@/types';

const mockDocuments = [
    { id: '1', filename: 'Calculus_Textbook.pdf', category: 'MATH' },
    { id: '2', filename: 'Biology_101.pdf', category: 'SCIENCE' },
    { id: '3', filename: 'World_History_Notes.pdf', category: 'HISTORY' },
    { id: '4', filename: 'Python_Programming.pdf', category: 'COMPUTER_SCIENCE' },
    { id: '5', filename: 'Organic_Chemistry.pdf', category: 'SCIENCE' },
];

const mockHistory = [
    { id: 'q1', title: 'Calculus Quiz', score: 8, total: 10, percentage: 80, status: 'completed' as const, difficulty: 'medium' as Difficulty, created_at: '2025-01-16T10:00:00Z' },
    { id: 'q2', title: 'Biology Quiz', score: 7, total: 10, percentage: 70, status: 'completed' as const, difficulty: 'easy' as Difficulty, created_at: '2025-01-15T14:00:00Z' },
    { id: 'q3', title: 'History Quiz', score: 5, total: 10, percentage: 50, status: 'completed' as const, difficulty: 'hard' as Difficulty, created_at: '2025-01-14T09:00:00Z' },
];

const difficulties: { value: Difficulty; label: string; desc: string }[] = [
    { value: 'easy', label: 'Easy', desc: 'Basic recall and understanding' },
    { value: 'medium', label: 'Medium', desc: 'Application and analysis' },
    { value: 'hard', label: 'Hard', desc: 'Synthesis and evaluation' },
];

export default function QuizSetupPage() {
    const router = useRouter();
    const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
    const [questionCount, setQuestionCount] = useState(10);
    const [difficulty, setDifficulty] = useState<Difficulty>('medium');
    const [topicFocus, setTopicFocus] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        if (selectedDocs.length === 0) return;
        setIsGenerating(true);
        setTimeout(() => {
            router.push('/quiz/new-quiz-id');
        }, 1500);
    };

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-serif">Create a Quiz</h1>
                <p className="text-muted-foreground mt-1">Test your knowledge with AI-generated questions</p>
            </div>

            <Card>
                <CardContent className="p-6 space-y-6">
                    {/* Document Selection */}
                    <div>
                        <Label className="text-sm font-semibold mb-3 block">Select Documents *</Label>
                        <div className="space-y-2 max-h-48 overflow-y-auto border border-border rounded-lg p-3">
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
                                    <Badge variant="secondary" className="text-xs ml-auto">{doc.category}</Badge>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Question Count */}
                    <div>
                        <Label className="text-sm font-semibold mb-3 block">
                            Number of Questions: <span className="text-primary">{questionCount}</span>
                        </Label>
                        <Slider
                            value={[questionCount]}
                            onValueChange={([val]) => setQuestionCount(val)}
                            min={3}
                            max={20}
                            step={1}
                            className="mt-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>3</span><span>20</span>
                        </div>
                    </div>

                    {/* Difficulty */}
                    <div>
                        <Label className="text-sm font-semibold mb-3 block">Difficulty Level</Label>
                        <div className="grid grid-cols-3 gap-3">
                            {difficulties.map((d) => (
                                <button
                                    key={d.value}
                                    type="button"
                                    onClick={() => setDifficulty(d.value)}
                                    className={cn(
                                        'rounded-xl border-2 p-3 text-center transition-all',
                                        difficulty === d.value
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-primary/30'
                                    )}
                                >
                                    <p className="text-sm font-medium">{d.label}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{d.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Topic Focus */}
                    <div>
                        <Label className="text-sm font-semibold mb-2 block">Topic Focus (optional)</Label>
                        <Input
                            value={topicFocus}
                            onChange={(e) => setTopicFocus(e.target.value)}
                            placeholder="e.g., cellular respiration, derivatives, World War II"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Leave blank for a general quiz</p>
                    </div>

                    {/* Generate Button */}
                    <Button
                        onClick={handleGenerate}
                        disabled={selectedDocs.length === 0 || isGenerating}
                        className="w-full h-12 text-base bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#F59E0B]/90 hover:to-[#D97706]/90 text-white"
                    >
                        {isGenerating ? (
                            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating questions...</>
                        ) : (
                            <><ClipboardList className="mr-2 h-5 w-5" /> Generate Quiz</>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* Past Quizzes */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Past Quizzes</h2>
                <div className="divide-y divide-border rounded-xl border border-border">
                    {mockHistory.map((quiz) => (
                        <div
                            key={quiz.id}
                            className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                            onClick={() => router.push(`/quiz/${quiz.id}/results`)}
                        >
                            <div>
                                <p className="text-sm font-medium">{quiz.title}</p>
                                <p className="text-xs text-muted-foreground">
                                    {format(new Date(quiz.created_at), 'MMM d, yyyy')} · {quiz.difficulty}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    <Trophy className={cn('h-4 w-4', quiz.percentage >= 70 ? 'text-emerald-500' : quiz.percentage >= 50 ? 'text-amber-500' : 'text-red-500')} />
                                    <span className={cn('text-sm font-semibold', quiz.percentage >= 70 ? 'text-emerald-500' : quiz.percentage >= 50 ? 'text-amber-500' : 'text-red-500')}>
                                        {quiz.percentage}%
                                    </span>
                                </div>
                                <span className="text-xs text-muted-foreground">{quiz.score}/{quiz.total}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
