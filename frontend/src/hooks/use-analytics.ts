import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '@/lib/api/analytics';

export function useDashboardStats(timeRange?: string) {
    return useQuery({
        queryKey: ['analytics', 'dashboard', timeRange],
        queryFn: () => analyticsApi.dashboard(timeRange),
    });
}

export function useActivityData(timeRange?: string) {
    return useQuery({
        queryKey: ['analytics', 'activity', timeRange],
        queryFn: () => analyticsApi.activity(timeRange),
    });
}

export function useWeakAreas() {
    return useQuery({
        queryKey: ['analytics', 'weak-areas'],
        queryFn: () => analyticsApi.weakAreas(),
    });
}

export function useStudyCalendar() {
    return useQuery({
        queryKey: ['analytics', 'study-calendar'],
        queryFn: () => analyticsApi.studyCalendar(),
    });
}
