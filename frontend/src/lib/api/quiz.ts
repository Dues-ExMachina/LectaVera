import apiClient from './client';
import type { Quiz, QuizResult, QuizGenerateRequest, QuizSubmitRequest, QuizHistory } from '@/types';

export const quizApi = {
    generate: async (data: QuizGenerateRequest): Promise<Quiz> => {
        const res = await apiClient.post('/quiz/generate', data);
        return res.data;
    },

    get: async (id: string): Promise<Quiz> => {
        const res = await apiClient.get(`/quiz/${id}`);
        return res.data;
    },

    submit: async (id: string, data: QuizSubmitRequest): Promise<QuizResult> => {
        const res = await apiClient.post(`/quiz/${id}/submit`, data);
        return res.data;
    },

    history: async (): Promise<QuizHistory[]> => {
        const res = await apiClient.get('/quiz/history');
        return res.data;
    },
};
