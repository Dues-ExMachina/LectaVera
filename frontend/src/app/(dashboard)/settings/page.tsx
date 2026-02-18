'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, changePasswordSchema, type ProfileFormData, type ChangePasswordFormData } from '@/lib/validations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { User, Lock, Bell, Palette, BookOpen, Camera, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
    const profileForm = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            full_name: 'John Doe',
            username: 'johndoe',
            email: 'john@example.com',
            bio: 'Lifelong learner passionate about science and technology.',
        },
    });

    const passwordForm = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
    });

    const [preferences, setPreferences] = React.useState({
        theme: 'system',
        defaultStudyMode: 'answer',
        quizDifficulty: 'medium',
        questionsPerQuiz: 10,
        emailNotifications: true,
        studyReminders: true,
        quizResults: true,
        weeklyReport: false,
    });

    const [isSaving, setIsSaving] = React.useState(false);

    const handleSaveProfile = (data: ProfileFormData) => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            toast.success('Profile updated successfully!');
        }, 1000);
    };

    const handleChangePassword = (data: ChangePasswordFormData) => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            passwordForm.reset();
            toast.success('Password changed successfully!');
        }, 1000);
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-serif">Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="profile" className="gap-2">
                        <User className="h-4 w-4" /> Profile
                    </TabsTrigger>
                    <TabsTrigger value="security" className="gap-2">
                        <Lock className="h-4 w-4" /> Security
                    </TabsTrigger>
                    <TabsTrigger value="preferences" className="gap-2">
                        <Palette className="h-4 w-4" /> Preferences
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-2">
                        <Bell className="h-4 w-4" /> Notifications
                    </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={profileForm.handleSubmit(handleSaveProfile)} className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src="/placeholder-avatar.jpg" />
                                        <AvatarFallback className="text-lg bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-white">
                                            JD
                                        </AvatarFallback>
                                    </Avatar>
                                    <Button type="button" variant="outline" size="sm">
                                        <Camera className="mr-2 h-4 w-4" /> Change Avatar
                                    </Button>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Full Name</Label>
                                        <Input {...profileForm.register('full_name')} />
                                        {profileForm.formState.errors.full_name && (
                                            <p className="text-xs text-destructive">{profileForm.formState.errors.full_name.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Username</Label>
                                        <Input {...profileForm.register('username')} />
                                        {profileForm.formState.errors.username && (
                                            <p className="text-xs text-destructive">{profileForm.formState.errors.username.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input {...profileForm.register('email')} type="email" />
                                    {profileForm.formState.errors.email && (
                                        <p className="text-xs text-destructive">{profileForm.formState.errors.email.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Bio</Label>
                                    <Input {...profileForm.register('bio')} placeholder="Tell us about yourself..." />
                                </div>

                                <Button type="submit" disabled={isSaving} className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white">
                                    {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>Ensure your account stays secure</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={passwordForm.handleSubmit(handleChangePassword)} className="space-y-4 max-w-sm">
                                <div className="space-y-2">
                                    <Label>Current Password</Label>
                                    <Input type="password" {...passwordForm.register('currentPassword')} />
                                    {passwordForm.formState.errors.currentPassword && (
                                        <p className="text-xs text-destructive">{passwordForm.formState.errors.currentPassword.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>New Password</Label>
                                    <Input type="password" {...passwordForm.register('newPassword')} />
                                    {passwordForm.formState.errors.newPassword && (
                                        <p className="text-xs text-destructive">{passwordForm.formState.errors.newPassword.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Confirm New Password</Label>
                                    <Input type="password" {...passwordForm.register('confirmNewPassword')} />
                                    {passwordForm.formState.errors.confirmNewPassword && (
                                        <p className="text-xs text-destructive">{passwordForm.formState.errors.confirmNewPassword.message}</p>
                                    )}
                                </div>
                                <Button type="submit" disabled={isSaving} className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white">
                                    {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</> : 'Update Password'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Preferences Tab */}
                <TabsContent value="preferences">
                    <Card>
                        <CardHeader>
                            <CardTitle>Study Preferences</CardTitle>
                            <CardDescription>Customize your learning experience</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Theme</Label>
                                <Select value={preferences.theme} onValueChange={(v) => setPreferences({ ...preferences, theme: v })}>
                                    <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <Label>Default Study Mode</Label>
                                <Select value={preferences.defaultStudyMode} onValueChange={(v) => setPreferences({ ...preferences, defaultStudyMode: v })}>
                                    <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="answer">Answer</SelectItem>
                                        <SelectItem value="summarize">Summarize</SelectItem>
                                        <SelectItem value="deep_dive">Deep Dive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <Label>Default Quiz Difficulty</Label>
                                <Select value={preferences.quizDifficulty} onValueChange={(v) => setPreferences({ ...preferences, quizDifficulty: v })}>
                                    <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="easy">Easy</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="hard">Hard</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <Label>Questions Per Quiz: <span className="text-primary font-semibold">{preferences.questionsPerQuiz}</span></Label>
                                <Slider
                                    value={[preferences.questionsPerQuiz]}
                                    onValueChange={([val]) => setPreferences({ ...preferences, questionsPerQuiz: val })}
                                    min={3}
                                    max={20}
                                    step={1}
                                    className="max-w-xs"
                                />
                            </div>
                            <Button
                                onClick={() => toast.success('Preferences saved!')}
                                className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white"
                            >
                                <Save className="mr-2 h-4 w-4" /> Save Preferences
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Settings</CardTitle>
                            <CardDescription>Control what notifications you receive</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {[
                                { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive important updates via email' },
                                { key: 'studyReminders', label: 'Study Reminders', desc: 'Get reminded to study daily' },
                                { key: 'quizResults', label: 'Quiz Results', desc: 'Receive notifications when quizzes are graded' },
                                { key: 'weeklyReport', label: 'Weekly Report', desc: 'Get a summary of your weekly progress' },
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between">
                                    <div>
                                        <Label className="text-sm font-medium">{item.label}</Label>
                                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                                    </div>
                                    <Switch
                                        checked={preferences[item.key as keyof typeof preferences] as boolean}
                                        onCheckedChange={(checked) =>
                                            setPreferences({ ...preferences, [item.key]: checked })
                                        }
                                    />
                                </div>
                            ))}
                            <Button
                                onClick={() => toast.success('Notification settings saved!')}
                                className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white"
                            >
                                <Save className="mr-2 h-4 w-4" /> Save Settings
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
