import apiClient from './client';
import type { UserPreferences, User } from '@/types';

export const usersApi = {
    getPreferences: async (): Promise<UserPreferences> => {
        const res = await apiClient.get('/users/preferences');
        return res.data;
    },

    updatePreferences: async (data: Partial<UserPreferences>): Promise<UserPreferences> => {
        const res = await apiClient.patch('/users/preferences', data);
        return res.data;
    },

    updateProfile: async (data: { full_name?: string; avatar_url?: string }): Promise<User> => {
        const res = await apiClient.patch('/users/profile', data);
        return res.data;
    },

    uploadAvatar: async (file: File): Promise<{ avatar_url: string }> => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await apiClient.post('/users/avatar', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
    },
};
