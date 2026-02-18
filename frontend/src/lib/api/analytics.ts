import apiClient from './client';
import type { DashboardStats, ActivityData, WeakArea, StudyCalendarDay } from '@/types';

export const analyticsApi = {
    dashboard: async (timeRange?: string): Promise<DashboardStats> => {
        const res = await apiClient.get('/analytics/dashboard', {
            params: timeRange ? { time_range: timeRange } : undefined,
        });
        return res.data;
    },

    activity: async (timeRange?: string): Promise<ActivityData> => {
        const res = await apiClient.get('/analytics/activity', {
            params: timeRange ? { time_range: timeRange } : undefined,
        });
        return res.data;
    },

    weakAreas: async (): Promise<WeakArea[]> => {
        const res = await apiClient.get('/analytics/weak-areas');
        return res.data;
    },

    studyCalendar: async (): Promise<StudyCalendarDay[]> => {
        const res = await apiClient.get('/analytics/study-calendar');
        return res.data;
    },
};
