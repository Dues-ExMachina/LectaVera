import { create } from 'zustand';
import type { Message, StudyMode } from '@/types';

interface ChatState {
    messages: Message[];
    isTyping: boolean;
    currentMode: StudyMode;
    setMessages: (messages: Message[]) => void;
    addMessage: (message: Message) => void;
    updateLastMessage: (content: string) => void;
    completeLastMessage: (data: Partial<Message>) => void;
    setIsTyping: (typing: boolean) => void;
    setCurrentMode: (mode: StudyMode) => void;
    clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
    messages: [],
    isTyping: false,
    currentMode: 'answer',
    setMessages: (messages) => set({ messages }),
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    updateLastMessage: (content) =>
        set((state) => {
            const msgs = [...state.messages];
            const last = msgs[msgs.length - 1];
            if (last && last.role === 'assistant' && last.isStreaming) {
                msgs[msgs.length - 1] = { ...last, content: last.content + content };
            } else {
                msgs.push({ role: 'assistant', content, isStreaming: true });
            }
            return { messages: msgs };
        }),
    completeLastMessage: (data) =>
        set((state) => {
            const msgs = [...state.messages];
            const last = msgs[msgs.length - 1];
            if (last && last.role === 'assistant') {
                msgs[msgs.length - 1] = { ...last, ...data, isStreaming: false };
            }
            return { messages: msgs };
        }),
    setIsTyping: (typing) => set({ isTyping: typing }),
    setCurrentMode: (mode) => set({ currentMode: mode }),
    clearMessages: () => set({ messages: [] }),
}));
