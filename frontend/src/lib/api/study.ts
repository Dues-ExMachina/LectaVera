import apiClient from './client';
import type { StudySession, SessionWithMessages, StudyMode } from '@/types';

export const studyApi = {
    createSession: async (data: {
        selected_document_ids: string[];
        mode: StudyMode;
    }): Promise<StudySession> => {
        const res = await apiClient.post('/study/sessions', data);
        return res.data;
    },

    listSessions: async (): Promise<StudySession[]> => {
        const res = await apiClient.get('/study/sessions');
        return res.data;
    },

    getSession: async (id: string): Promise<SessionWithMessages> => {
        const res = await apiClient.get(`/study/sessions/${id}`);
        return res.data;
    },

    sendMessage: async (
        sessionId: string,
        data: { content: string; mode: StudyMode }
    ) => {
        const res = await apiClient.post(`/study/sessions/${sessionId}/messages`, data);
        return res.data;
    },

    deleteSession: async (id: string): Promise<void> => {
        await apiClient.delete(`/study/sessions/${id}`);
    },

    exportSession: async (id: string, format: 'pdf' | 'json' = 'pdf') => {
        const res = await apiClient.get(`/study/sessions/${id}/export`, {
            params: { format },
            responseType: 'blob',
        });
        return res.data;
    },
};
