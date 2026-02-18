'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketManager } from '@/lib/websocket';
import { useChatStore } from '@/store/chat-store';
import type { Citation, StudyMode } from '@/types';

export function useWebSocket(sessionId: string) {
    const wsRef = useRef<WebSocketManager | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const { addMessage, updateLastMessage, completeLastMessage, setIsTyping } = useChatStore();

    useEffect(() => {
        const ws = new WebSocketManager(sessionId);

        ws.onConnect = () => setIsConnected(true);
        ws.onDisconnect = () => setIsConnected(false);

        ws.onMessage = (data) => {
            if (data.type === 'chunk') {
                setIsTyping(true);
                updateLastMessage(data.content);
            } else if (data.type === 'complete') {
                setIsTyping(false);
                completeLastMessage({
                    citations: data.citations as Citation[],
                    verdict: data.verdict as 'correct' | 'ambiguous' | 'incorrect',
                    follow_up: data.follow_up,
                });
            } else if (data.type === 'error') {
                setIsTyping(false);
            }
        };

        ws.connect();
        wsRef.current = ws;

        return () => {
            ws.disconnect();
        };
    }, [sessionId, addMessage, updateLastMessage, completeLastMessage, setIsTyping]);

    const sendMessage = useCallback(
        (content: string, mode: StudyMode) => {
            addMessage({ role: 'user', content });
            wsRef.current?.send(content, mode);
        },
        [addMessage]
    );

    return { isConnected, sendMessage };
}
