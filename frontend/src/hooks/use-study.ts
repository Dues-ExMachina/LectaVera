import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { studyApi } from '@/lib/api/study';
import type { StudyMode } from '@/types';

export function useStudySessions() {
    return useQuery({
        queryKey: ['study', 'sessions'],
        queryFn: () => studyApi.listSessions(),
    });
}

export function useStudySession(id: string) {
    return useQuery({
        queryKey: ['study', 'sessions', id],
        queryFn: () => studyApi.getSession(id),
        enabled: !!id,
    });
}

export function useCreateSession() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { selected_document_ids: string[]; mode: StudyMode }) =>
            studyApi.createSession(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['study', 'sessions'] });
            toast.success('Study session created!');
        },
        onError: () => {
            toast.error('Failed to create session.');
        },
    });
}

export function useDeleteSession() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => studyApi.deleteSession(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['study', 'sessions'] });
            toast.success('Session deleted.');
        },
        onError: () => {
            toast.error('Failed to delete session.');
        },
    });
}

export function useSendMessage(sessionId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { content: string; mode: StudyMode }) =>
            studyApi.sendMessage(sessionId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['study', 'sessions', sessionId] });
        },
        onError: () => {
            toast.error('Failed to send message.');
        },
    });
}
