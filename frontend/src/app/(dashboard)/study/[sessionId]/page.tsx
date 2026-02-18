'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import {
    Send,
    Download,
    Clock,
    Wifi,
    WifiOff,
    GraduationCap,
    CheckCircle,
    AlertTriangle,
    Globe,
    FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { Message, StudyMode, Citation } from '@/types';

const modes: { value: StudyMode; label: string }[] = [
    { value: 'answer', label: 'Answer' },
    { value: 'summarize', label: 'Summarize' },
    { value: 'deep_dive', label: 'Deep Dive' },
];

// Mock initial messages
const initialMessages: Message[] = [
    {
        id: '1',
        role: 'assistant',
        content: "Welcome to your study session! I'm ready to help you learn. Ask me anything about your selected documents, and I'll provide detailed answers with citations.\n\n*What would you like to explore today?*",
        created_at: new Date(Date.now() - 60000).toISOString(),
    },
];

function VerdictBadge({ verdict }: { verdict?: string }) {
    if (!verdict) return null;
    switch (verdict) {
        case 'correct':
            return (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
                    <CheckCircle className="h-3 w-3" /> Found in your notes
                </span>
            );
        case 'ambiguous':
            return (
                <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full">
                    <AlertTriangle className="h-3 w-3" /> Partial info found
                </span>
            );
        case 'incorrect':
            return (
                <span className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">
                    <Globe className="h-3 w-3" /> Searched the web
                </span>
            );
        default:
            return null;
    }
}

function CitationBadge({ citation }: { citation: Citation }) {
    return (
        <Tooltip>
            <TooltipTrigger>
                <span className={cn(
                    'inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full cursor-pointer transition-colors',
                    citation.source_type === 'pdf'
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-100'
                        : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 hover:bg-emerald-100'
                )}>
                    {citation.source_type === 'pdf' ? <FileText className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
                    {citation.document_name || 'Source'} {citation.page_number && `p.${citation.page_number}`}
                </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
                <p className="text-xs">{citation.snippet}</p>
            </TooltipContent>
        </Tooltip>
    );
}

function TypingIndicator() {
    return (
        <div className="flex items-center gap-3 p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6]">
                <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span>LectaVera is thinking</span>
                <span className="flex gap-0.5">
                    <span className="animate-bounce [animation-delay:0ms] h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                    <span className="animate-bounce [animation-delay:150ms] h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                    <span className="animate-bounce [animation-delay:300ms] h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                </span>
            </div>
        </div>
    );
}

export default function StudySessionPage() {
    const params = useParams();
    const sessionId = params.sessionId as string;
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState('');
    const [mode, setMode] = useState<StudyMode>('answer');
    const [isTyping, setIsTyping] = useState(false);
    const [isConnected] = useState(true);
    const [startTime] = useState(Date.now());
    const [elapsed, setElapsed] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Timer
    useEffect(() => {
        const interval = setInterval(() => {
            setElapsed(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, [startTime]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const formatElapsed = (seconds: number) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            mode,
            created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `Based on your documents, here's what I found:\n\nThe concept you're asking about relates to **key principles** discussed in your study materials. The fundamental understanding involves:\n\n1. **Core Definition** — The primary concept as outlined in your notes\n2. **Application** — How this applies in practice\n3. **Important Considerations** — Key factors to remember\n\nThis aligns with the information found in your uploaded documents.\n\n*Would you like me to elaborate on any of these points?*`,
                citations: [
                    { id: '1', source_type: 'pdf', document_name: 'Calculus_Textbook.pdf', page_number: 45, snippet: 'The derivative of a function represents the rate of change...' },
                    { id: '2', source_type: 'pdf', document_name: 'Calculus_Textbook.pdf', page_number: 52, snippet: 'Applications of derivatives include optimization problems...' },
                ],
                verdict: 'correct',
                follow_up: 'Would you like me to explain the proof in more detail?',
                created_at: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, aiMsg]);
            setIsTyping(false);
        }, 2000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            {/* Top bar */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                    <h1 className="text-lg font-semibold font-serif">Study Session</h1>
                    <Badge variant="secondary" className="text-xs">{mode}</Badge>
                </div>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" /> {formatElapsed(elapsed)}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm">
                        {isConnected ? (
                            <><Wifi className="h-4 w-4 text-emerald-500" /><span className="text-emerald-500 text-xs">Connected</span></>
                        ) : (
                            <><WifiOff className="h-4 w-4 text-red-500" /><span className="text-red-500 text-xs">Disconnected</span></>
                        )}
                    </span>
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                </div>
            </div>

            {/* Messages */}
            <ScrollArea ref={scrollRef} className="flex-1 py-4">
                <div className="space-y-6 max-w-3xl mx-auto">
                    {messages.map((msg) => (
                        <div key={msg.id} className={cn('flex gap-3', msg.role === 'user' && 'justify-end')}>
                            {msg.role === 'assistant' && (
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6]">
                                    <GraduationCap className="h-4 w-4 text-white" />
                                </div>
                            )}
                            <div
                                className={cn(
                                    'rounded-2xl px-4 py-3 max-w-[80%]',
                                    msg.role === 'user'
                                        ? 'bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white'
                                        : 'bg-muted'
                                )}
                            >
                                <div className={cn('text-sm prose prose-sm max-w-none', msg.role === 'user' && 'text-white prose-invert')}>
                                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                                </div>

                                {msg.citations && msg.citations.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-border/30">
                                        {msg.citations.map((citation) => (
                                            <CitationBadge key={citation.id} citation={citation} />
                                        ))}
                                    </div>
                                )}

                                {msg.verdict && (
                                    <div className="mt-2">
                                        <VerdictBadge verdict={msg.verdict} />
                                    </div>
                                )}

                                <p className={cn('text-xs mt-2', msg.role === 'user' ? 'text-white/60' : 'text-muted-foreground')}>
                                    {msg.created_at && format(new Date(msg.created_at), 'h:mm a')}
                                </p>
                            </div>
                        </div>
                    ))}
                    {isTyping && <TypingIndicator />}
                </div>
            </ScrollArea>

            {/* Input area */}
            <div className="border-t border-border pt-4 space-y-3">
                {/* Mode switcher */}
                <div className="flex gap-2">
                    {modes.map((m) => (
                        <Button
                            key={m.value}
                            variant={mode === m.value ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setMode(m.value)}
                            className={cn(mode === m.value && 'bg-primary text-primary-foreground')}
                        >
                            {m.label}
                        </Button>
                    ))}
                </div>

                <div className="flex gap-2">
                    <Textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask a question about your documents..."
                        className="min-h-[44px] max-h-[120px] resize-none"
                        rows={1}
                    />
                    <Button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white px-4"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
