'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';
import { useAuth } from '@/hooks/use-auth';
import {
    LayoutDashboard,
    BookOpen,
    Brain,
    ClipboardList,
    BarChart3,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/bookshelf', label: 'My Bookshelf', icon: BookOpen },
    { href: '/study', label: 'Study Session', icon: Brain },
    { href: '/quiz', label: 'Quiz Mode', icon: ClipboardList },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const { sidebarCollapsed, toggleSidebar } = useUIStore();
    const { user, logout } = useAuth();

    const initials = user?.full_name
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase() || 'U';

    return (
        <aside
            className={cn(
                'fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300 flex flex-col',
                sidebarCollapsed ? 'w-[68px]' : 'w-[256px]'
            )}
        >
            {/* Logo */}
            <div className="flex h-16 items-center border-b border-border px-4">
                <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-white">
                        <GraduationCap className="h-5 w-5" />
                    </div>
                    {!sidebarCollapsed && (
                        <div className="flex flex-col">
                            <span className="text-lg font-bold tracking-tight font-serif text-foreground">
                                LectaVera
                            </span>
                            <span className="text-[10px] text-muted-foreground italic -mt-1">
                                Veritas in Studio
                            </span>
                        </div>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    const Icon = item.icon;

                    const link = (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                                isActive
                                    ? 'bg-primary/10 text-primary border-l-2 border-primary'
                                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                            )}
                        >
                            <Icon className={cn('h-5 w-5 shrink-0', isActive && 'text-primary')} />
                            {!sidebarCollapsed && <span>{item.label}</span>}
                        </Link>
                    );

                    if (sidebarCollapsed) {
                        return (
                            <Tooltip key={item.href} delayDuration={0}>
                                <TooltipTrigger asChild>{link}</TooltipTrigger>
                                <TooltipContent side="right" className="font-medium">
                                    {item.label}
                                </TooltipContent>
                            </Tooltip>
                        );
                    }

                    return link;
                })}
            </nav>

            {/* Bottom - User & Actions in one row */}
            <div className="border-t border-border p-3">
                <div className={cn(
                    'flex items-center',
                    sidebarCollapsed ? 'flex-col gap-2' : 'gap-3'
                )}>
                    {/* User avatar + name */}
                    <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-white text-xs">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    {!sidebarCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate text-foreground">{user?.full_name || 'User'}</p>
                            <p className="text-xs text-muted-foreground truncate">{user?.email || ''}</p>
                        </div>
                    )}

                    {/* Logout + Collapse on the right */}
                    <div className={cn('flex items-center gap-1', sidebarCollapsed && 'flex-col')}>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                    onClick={logout}
                                >
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side={sidebarCollapsed ? 'right' : 'top'}>Logout</TooltipContent>
                        </Tooltip>

                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground"
                                    onClick={toggleSidebar}
                                >
                                    {sidebarCollapsed ? (
                                        <ChevronRight className="h-4 w-4" />
                                    ) : (
                                        <ChevronLeft className="h-4 w-4" />
                                    )}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side={sidebarCollapsed ? 'right' : 'top'}>
                                {sidebarCollapsed ? 'Expand' : 'Collapse'}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </aside>
    );
}
