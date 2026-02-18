'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CheckCircle, XCircle, Clock, ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

const mockResults = {
    score: 8,
    total: 10,
    percentage: 80,
    time_taken: '12 minutes',
    questions: [
        { id: 'q1', question: 'What is the derivative of sin(x)?', options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'], correct_answer_index: 0, user_answer_index: 0, explanation: 'The derivative of sin(x) = cos(x) by basic differentiation rules.', source_reference: 'Calculus_Textbook.pdf, Page 45' },
        { id: 'q2', question: 'Which organelle is responsible for cellular respiration?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi apparatus'], correct_answer_index: 2, user_answer_index: 2, explanation: 'Mitochondria are the powerhouse of the cell.', source_reference: 'Biology_101.pdf, Page 23' },
        { id: 'q3', question: 'In what year did World War II end?', options: ['1943', '1944', '1945', '1946'], correct_answer_index: 2, user_answer_index: 2, explanation: 'WW2 ended in 1945 with the surrender of Japan.', source_reference: 'World_History_Notes.pdf, Page 12' },
        { id: 'q4', question: 'What data structure uses LIFO?', options: ['Queue', 'Stack', 'Linked List', 'Array'], correct_answer_index: 1, user_answer_index: 1, explanation: 'Stack uses Last In, First Out (LIFO) ordering.', source_reference: 'Python_Programming.pdf, Page 78' },
        { id: 'q5', question: 'What is the pH of pure water at 25°C?', options: ['6', '7', '8', '14'], correct_answer_index: 1, user_answer_index: 0, explanation: 'Pure water has a pH of 7 at 25°C, which is neutral.', source_reference: 'Organic_Chemistry.pdf, Page 5' },
        { id: 'q6', question: 'Best average-case sorting algorithm?', options: ['Bubble Sort', 'Merge Sort', 'Selection Sort', 'Insertion Sort'], correct_answer_index: 1, user_answer_index: 1, explanation: 'Merge Sort has O(n log n) average-case time complexity.', source_reference: 'Python_Programming.pdf, Page 120' },
        { id: 'q7', question: 'What is the integral of 1/x?', options: ['x²/2', 'ln|x| + C', '1/x² + C', 'e^x + C'], correct_answer_index: 1, user_answer_index: 1, explanation: 'The integral of 1/x is the natural logarithm.', source_reference: 'Calculus_Textbook.pdf, Page 89' },
        { id: 'q8', question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Chloroplast', 'Endoplasmic Reticulum'], correct_answer_index: 1, user_answer_index: 1, explanation: 'Mitochondria are known as the powerhouse of the cell.', source_reference: 'Biology_101.pdf, Page 30' },
        { id: 'q9', question: 'Which treaty ended World War I?', options: ['Treaty of Paris', 'Treaty of Versailles', 'Treaty of Ghent', 'Treaty of Westphalia'], correct_answer_index: 1, user_answer_index: 0, explanation: 'The Treaty of Versailles was signed in 1919.', source_reference: 'World_History_Notes.pdf, Page 8' },
        { id: 'q10', question: 'Time complexity of binary search?', options: ['O(n)', 'O(n²)', 'O(log n)', 'O(n log n)'], correct_answer_index: 2, user_answer_index: 2, explanation: 'Binary search divides the search space in half each time.', source_reference: 'Python_Programming.pdf, Page 95' },
    ],
};

export default function QuizResultsPage() {
    const params = useParams();
    const { score, total, percentage, time_taken, questions } = mockResults;

    const scoreColor = percentage >= 70 ? 'text-emerald-500' : percentage >= 50 ? 'text-amber-500' : 'text-red-500';
    const scoreBg = percentage >= 70 ? 'from-emerald-500 to-emerald-600' : percentage >= 50 ? 'from-amber-500 to-amber-600' : 'from-red-500 to-red-600';

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-serif">Quiz Results</h1>
            </div>

            {/* Score Display */}
            <Card className="text-center">
                <CardContent className="p-8">
                    <div className="relative mx-auto h-32 w-32 mb-4">
                        <svg className="h-32 w-32 transform -rotate-90" viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
                            <circle
                                cx="60" cy="60" r="54" fill="none" strokeWidth="8"
                                stroke="url(#scoreGradient)"
                                strokeLinecap="round"
                                strokeDasharray={`${(percentage / 100) * 339.292} 339.292`}
                            />
                            <defs>
                                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" className={cn(percentage >= 70 ? 'text-emerald-500' : percentage >= 50 ? 'text-amber-500' : 'text-red-500')} stopColor="currentColor" />
                                    <stop offset="100%" className={cn(percentage >= 70 ? 'text-emerald-600' : percentage >= 50 ? 'text-amber-600' : 'text-red-600')} stopColor="currentColor" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className={cn('text-3xl font-bold', scoreColor)}>{percentage}%</span>
                        </div>
                    </div>
                    <p className="text-lg font-medium">{score} out of {total} correct</p>
                </CardContent>
            </Card>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-4 text-center">
                        <CheckCircle className="h-6 w-6 text-emerald-500 mx-auto mb-1" />
                        <p className="text-2xl font-bold text-emerald-500">{score}</p>
                        <p className="text-xs text-muted-foreground">Correct</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <XCircle className="h-6 w-6 text-red-500 mx-auto mb-1" />
                        <p className="text-2xl font-bold text-red-500">{total - score}</p>
                        <p className="text-xs text-muted-foreground">Incorrect</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <Clock className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                        <p className="text-2xl font-bold text-blue-500">{time_taken}</p>
                        <p className="text-xs text-muted-foreground">Time Taken</p>
                    </CardContent>
                </Card>
            </div>

            {/* Question Breakdown */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Question Breakdown</h2>
                <Accordion type="single" collapsible className="space-y-2">
                    {questions.map((q, i) => {
                        const isCorrect = q.correct_answer_index === q.user_answer_index;
                        return (
                            <AccordionItem key={q.id} value={q.id} className="border rounded-lg px-4">
                                <AccordionTrigger className="hover:no-underline">
                                    <div className="flex items-center gap-3 text-left">
                                        {isCorrect ? (
                                            <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                                        ) : (
                                            <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                                        )}
                                        <span className="text-sm font-medium">Q{i + 1}: {q.question}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="space-y-3 pt-2">
                                    <div className="space-y-2">
                                        {q.options.map((option, oi) => (
                                            <div
                                                key={oi}
                                                className={cn(
                                                    'flex items-center gap-3 p-2 rounded-lg text-sm',
                                                    oi === q.correct_answer_index && 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400',
                                                    oi === q.user_answer_index && !isCorrect && oi !== q.correct_answer_index && 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                                                )}
                                            >
                                                <span className="font-medium">{String.fromCharCode(65 + oi)}.</span>
                                                <span>{option}</span>
                                                {oi === q.correct_answer_index && <CheckCircle className="h-4 w-4 ml-auto text-emerald-500" />}
                                                {oi === q.user_answer_index && !isCorrect && <XCircle className="h-4 w-4 ml-auto text-red-500" />}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-muted/50 rounded-lg p-3 text-sm">
                                        <p className="font-medium mb-1">Explanation:</p>
                                        <p className="text-muted-foreground">{q.explanation}</p>
                                        <p className="text-xs text-primary mt-2">📄 {q.source_reference}</p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <Button variant="outline" asChild>
                    <Link href="/dashboard"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Link>
                </Button>
                <Button className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white" asChild>
                    <Link href="/quiz"><RotateCcw className="mr-2 h-4 w-4" /> Take Another Quiz</Link>
                </Button>
            </div>
        </div>
    );
}
