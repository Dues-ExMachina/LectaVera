import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { quizApi } from '@/lib/api/quiz';
import type { QuizGenerateRequest, QuizSubmitRequest } from '@/types';

export function useQuiz(id: string) {
    return useQuery({
        queryKey: ['quiz', id],
        queryFn: () => quizApi.get(id),
        enabled: !!id,
    });
}

export function useQuizHistory() {
    return useQuery({
        queryKey: ['quiz', 'history'],
        queryFn: () => quizApi.history(),
    });
}

export function useGenerateQuiz() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: QuizGenerateRequest) => quizApi.generate(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quiz', 'history'] });
            toast.success('Quiz generated!');
        },
        onError: () => {
            toast.error('Failed to generate quiz.');
        },
    });
}

export function useSubmitQuiz(quizId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: QuizSubmitRequest) => quizApi.submit(quizId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quiz', quizId] });
            queryClient.invalidateQueries({ queryKey: ['quiz', 'history'] });
            toast.success('Quiz submitted!');
        },
        onError: () => {
            toast.error('Failed to submit quiz.');
        },
    });
}
