import apiClient from './client';
import type { AuthResponse, LoginRequest, SignupRequest, User } from '@/types';

export const authApi = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const res = await apiClient.post('/auth/login', data);
        return res.data;
    },

    signup: async (data: SignupRequest): Promise<AuthResponse> => {
        const res = await apiClient.post('/auth/signup', data);
        return res.data;
    },

    refresh: async (refreshToken: string) => {
        const res = await apiClient.post('/auth/refresh', { refresh_token: refreshToken });
        return res.data;
    },

    logout: async () => {
        await apiClient.post('/auth/logout');
    },

    me: async (): Promise<User> => {
        const res = await apiClient.get('/auth/me');
        return res.data;
    },

    forgotPassword: async (email: string) => {
        const res = await apiClient.post('/auth/forgot-password', { email });
        return res.data;
    },

    resetPassword: async (token: string, newPassword: string) => {
        const res = await apiClient.post('/auth/reset-password', {
            token,
            new_password: newPassword,
        });
        return res.data;
    },
};
