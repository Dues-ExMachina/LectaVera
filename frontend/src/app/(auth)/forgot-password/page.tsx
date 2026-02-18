'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/validations';
import { authApi } from '@/lib/api/auth';
import { GraduationCap, Loader2, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setIsLoading(true);
        try {
            await authApi.forgotPassword(data.email);
            setIsSubmitted(true);
            toast.success('Password reset email sent!');
        } catch {
            toast.error('Failed to send reset email. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-[420px] backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border-white/20 shadow-2xl">
            <CardHeader className="text-center space-y-4 pb-2">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] shadow-lg shadow-blue-500/25">
                    {isSubmitted ? (
                        <Mail className="h-7 w-7 text-white" />
                    ) : (
                        <GraduationCap className="h-7 w-7 text-white" />
                    )}
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight font-serif text-foreground">
                        {isSubmitted ? 'Check your email' : 'Forgot Password'}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {isSubmitted
                            ? 'We sent a password reset link to your email'
                            : "Enter your email and we'll send you a reset link"}
                    </p>
                </div>
            </CardHeader>

            <CardContent>
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                {...register('email')}
                                className={errors.email ? 'border-destructive' : ''}
                            />
                            {errors.email && (
                                <p className="text-xs text-destructive">{errors.email.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#1E3A8A]/90 hover:to-[#2563EB]/90 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                'Send Reset Link'
                            )}
                        </Button>
                    </form>
                ) : (
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsSubmitted(false)}
                    >
                        Resend email
                    </Button>
                )}
            </CardContent>

            <CardFooter className="justify-center">
                <Link
                    href="/login"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to sign in
                </Link>
            </CardFooter>
        </Card>
    );
}
