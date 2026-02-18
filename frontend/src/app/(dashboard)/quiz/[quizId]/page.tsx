'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';

const mockQuestions = [
    { id: 'q1', question: 'What is the derivative of sin(x)?', options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'] },
    { id: 'q2', question: 'Which organelle is responsible for cellular respiration?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi apparatus'] },
    { id: 'q3', question: 'In what year did World War II end?', options: ['1943', '1944', '1945', '1946'] },
    { id: 'q4', question: 'What data structure uses LIFO (Last In, First Out)?', options: ['Queue', 'Stack', 'Linked List', 'Array'] },
    { id: 'q5', question: 'What is the pH of pure water at 25°C?', options: ['6', '7', '8', '14'] },
    { id: 'q6', question: 'Which sorting algorithm has the best average-case time complexity?', options: ['Bubble Sort O(n²)', 'Merge Sort O(n log n)', 'Selection Sort O(n²)', 'Insertion Sort O(n²)'] },
    { id: 'q7', question: 'What is the integral of 1/x?', options: ['x²/2', 'ln|x| + C', '1/x² + C', 'e^x + C'] },
    { id: 'q8', question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Chloroplast', 'Endoplasmic Reticulum'] },
    { id: 'q9', question: 'Which treaty ended World War I?', options: ['Treaty of Paris', 'Treaty of Versailles', 'Treaty of Ghent', 'Treaty of Westphalia'] },
    { id: 'q10', question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(n²)', 'O(log n)', 'O(n log n)'] },
];

export default function QuizTakingPage() {
    const router = useRouter();
    const params = useParams();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [showSubmitDialog, setShowSubmitDialog] = useState(false);

    const question = mockQuestions[currentIndex];
    const total = mockQuestions.length;
    const answeredCount = Object.keys(answers).length;
    const progressPercent = ((currentIndex + 1) / total) * 100;

    const selectAnswer = (optIndex: number) => {
        setAnswers({ ...answers, [question.id]: optIndex });
    };

    const goNext = () => {
        if (currentIndex < total - 1) setCurrentIndex(currentIndex + 1);
    };
    const goPrev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const handleSubmit = () => {
        router.push(`/quiz/${params.quizId}/results`);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Progress */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Question {currentIndex + 1} of {total}</span>
                    <span className="text-muted-foreground">{answeredCount} answered</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
            </div>

            {/* Question Card */}
            <Card className="border-2">
                <CardContent className="p-8">
                    <Badge variant="secondary" className="mb-4">Q{currentIndex + 1}</Badge>
                    <h2 className="text-xl font-semibold mb-6">{question.question}</h2>

                    <div className="space-y-3">
                        {question.options.map((option, index) => {
                            const letter = String.fromCharCode(65 + index);
                            const isSelected = answers[question.id] === index;
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => selectAnswer(index)}
                                    className={cn(
                                        'w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all hover:scale-[1.01]',
                                        isSelected
                                            ? 'border-primary bg-primary/5 shadow-md'
                                            : 'border-border hover:border-primary/30 hover:bg-muted/50'
                                    )}
                                >
                                    <span className={cn(
                                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold',
                                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                                    )}>
                                        {letter}
                                    </span>
                                    <span className="text-sm">{option}</span>
                                </button>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
                <Button variant="outline" onClick={goPrev} disabled={currentIndex === 0}>
                    Previous
                </Button>
                {currentIndex === total - 1 ? (
                    <Button
                        onClick={() => setShowSubmitDialog(true)}
                        className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white"
                    >
                        Submit Quiz
                    </Button>
                ) : (
                    <Button
                        onClick={goNext}
                        disabled={answers[question.id] === undefined}
                        className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white"
                    >
                        Next
                    </Button>
                )}
            </div>

            {/* Submit Dialog */}
            <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Submit Quiz?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">
                        You&apos;ve answered {answeredCount} of {total} questions.
                    </p>
                    {answeredCount < total && (
                        <p className="text-sm text-amber-600">{total - answeredCount} questions are unanswered.</p>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>Review</Button>
                        <Button onClick={handleSubmit} className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white">Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
