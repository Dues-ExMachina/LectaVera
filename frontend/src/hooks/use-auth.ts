'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth-store';
import { authApi } from '@/lib/api/auth';
import type { LoginRequest, SignupRequest } from '@/types';

export function useAuth() {
    const router = useRouter();
    const { user, isAuthenticated, setAuth, clearAuth, setUser } = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is authenticated on mount
        const checkAuth = async () => {
            if (isAuthenticated && !user) {
                try {
                    const userData = await authApi.me();
                    setUser(userData);
                } catch {
                    clearAuth();
                }
            }
            setIsLoading(false);
        };
        checkAuth();
    }, [isAuthenticated, user, setUser, clearAuth]);

    const loginMutation = useMutation({
        mutationFn: (data: LoginRequest) => authApi.login(data),
        onSuccess: (response) => {
            setAuth(response.user, response.tokens.access_token, response.tokens.refresh_token);
            toast.success('Welcome back!');
            router.push('/dashboard');
        },
        onError: () => {
            toast.error('Invalid email or password. Please try again.');
        },
    });

    const signupMutation = useMutation({
        mutationFn: (data: SignupRequest) => authApi.signup(data),
        onSuccess: (response) => {
            setAuth(response.user, response.tokens.access_token, response.tokens.refresh_token);
            toast.success('Account created successfully!');
            router.push('/dashboard');
        },
        onError: () => {
            toast.error('Failed to create account. Please try again.');
        },
    });

    const logout = useCallback(async () => {
        try {
            await authApi.logout();
        } catch {
            // Ignore logout API errors
        } finally {
            clearAuth();
            router.push('/login');
            toast.success('Logged out successfully');
        }
    }, [clearAuth, router]);

    return {
        user,
        isAuthenticated,
        isLoading,
        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        signup: signupMutation.mutate,
        isSigningUp: signupMutation.isPending,
        logout,
    };
}
