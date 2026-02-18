'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import {
    LayoutDashboard,
    BookOpen,
    Brain,
    ClipboardList,
    BarChart3,
    Settings,
    LogOut,
    GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/bookshelf', label: 'My Bookshelf', icon: BookOpen },
    { href: '/study', label: 'Study Session', icon: Brain },
    { href: '/quiz', label: 'Quiz Mode', icon: ClipboardList },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/settings', label: 'Settings', icon: Settings },
];

export function MobileNav() {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <div className="flex h-full flex-col bg-card">
            {/* Logo */}
            <div className="flex h-16 items-center border-b border-border px-4">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-white">
                        <GraduationCap className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold tracking-tight font-serif">LectaVera</span>
                        <span className="text-[10px] text-muted-foreground italic -mt-1">
                            Veritas in Studio
                        </span>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    const Icon = item.icon;

                    return (
                        <SheetClose asChild key={item.href}>
                            <Link
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </Link>
                        </SheetClose>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="border-t border-border p-3">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-destructive hover:text-destructive"
                    onClick={logout}
                >
                    <LogOut className="h-5 w-5" />
                    <span>Log out</span>
                </Button>
            </div>
        </div>
    );
}
