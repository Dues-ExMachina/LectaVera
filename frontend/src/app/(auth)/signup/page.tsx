'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/use-auth';
import { signupSchema, type SignupFormData } from '@/lib/validations';
import { GraduationCap, Eye, EyeOff, Loader2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

function PasswordStrength({ password }: { password: string }) {
    const checks = useMemo(() => ({
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
    }), [password]);

    const score = Object.values(checks).filter(Boolean).length;
    const labels = ['', 'Weak', 'Medium', 'Strong'];
    const colors = ['', 'bg-red-500', 'bg-yellow-500', 'bg-green-500'];

    if (!password) return null;

    return (
        <div className="space-y-2">
            <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className={cn(
                            'h-1.5 flex-1 rounded-full transition-colors',
                            i <= score ? colors[score] : 'bg-muted'
                        )}
                    />
                ))}
            </div>
            <p className={cn('text-xs', score <= 1 ? 'text-red-500' : score === 2 ? 'text-yellow-500' : 'text-green-500')}>
                {labels[score]}
            </p>
            <div className="space-y-1">
                {[
                    { check: checks.length, label: 'At least 8 characters' },
                    { check: checks.uppercase, label: 'One uppercase letter' },
                    { check: checks.number, label: 'One number' },
                ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-xs">
                        {item.check ? (
                            <Check className="h-3 w-3 text-green-500" />
                        ) : (
                            <X className="h-3 w-3 text-muted-foreground" />
                        )}
                        <span className={item.check ? 'text-green-500' : 'text-muted-foreground'}>
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function SignupPage() {
    const { signup, isSigningUp } = useAuth();
    const [showPassword, setShowPassword] = React.useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: { terms: false },
    });

    const password = watch('password', '');

    const onSubmit = (data: SignupFormData) => {
        signup({
            email: data.email,
            username: data.username,
            password: data.password,
            full_name: data.full_name,
        });
    };

    return (
        <Card className="w-full max-w-[460px] backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border-white/20 shadow-2xl">
            <CardHeader className="text-center space-y-3 pb-2">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] shadow-lg shadow-blue-500/25">
                    <GraduationCap className="h-7 w-7 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight font-serif text-foreground">
                        Create Account
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Join LectaVera and start your learning journey
                    </p>
                </div>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="space-y-1.5">
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                            id="full_name"
                            placeholder="John Doe"
                            {...register('full_name')}
                            className={errors.full_name ? 'border-destructive' : ''}
                        />
                        {errors.full_name && (
                            <p className="text-xs text-destructive">{errors.full_name.message}</p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            placeholder="johndoe"
                            {...register('username')}
                            className={errors.username ? 'border-destructive' : ''}
                        />
                        {errors.username && (
                            <p className="text-xs text-destructive">{errors.username.message}</p>
                        )}
                    </div>

                    <div className="space-y-1.5">
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

                    <div className="space-y-1.5">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                {...register('password')}
                                className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                        {errors.password && (
                            <p className="text-xs text-destructive">{errors.password.message}</p>
                        )}
                        <PasswordStrength password={password} />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            {...register('confirmPassword')}
                            className={errors.confirmPassword ? 'border-destructive' : ''}
                        />
                        {errors.confirmPassword && (
                            <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <div className="flex items-start gap-2 pt-1">
                        <Checkbox
                            id="terms"
                            onCheckedChange={(checked) => setValue('terms', checked === true)}
                        />
                        <Label htmlFor="terms" className="text-sm font-normal leading-relaxed cursor-pointer">
                            I agree to the{' '}
                            <span className="text-primary hover:underline cursor-pointer">Terms of Service</span>
                            {' '}and{' '}
                            <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
                        </Label>
                    </div>
                    {errors.terms && (
                        <p className="text-xs text-destructive">{errors.terms.message}</p>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#1E3A8A]/90 hover:to-[#2563EB]/90 text-white mt-2"
                        disabled={isSigningUp}
                    >
                        {isSigningUp ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </Button>
                </form>
            </CardContent>

            <CardFooter className="justify-center">
                <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-primary hover:underline">
                        Sign in
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
