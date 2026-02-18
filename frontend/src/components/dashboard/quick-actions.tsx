'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Brain, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function QuickActions() {
    const router = useRouter();

    const actions = [
        {
            label: 'Upload Document',
            description: 'Add a new PDF to your library',
            icon: Upload,
            onClick: () => router.push('/bookshelf'),
            className: 'bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] hover:from-[#1E3A8A]/90 hover:to-[#3B82F6]/90 text-white',
        },
        {
            label: 'Start Study Session',
            description: 'Ask questions about your docs',
            icon: Brain,
            onClick: () => router.push('/study'),
            className: 'bg-gradient-to-br from-[#10B981] to-[#059669] hover:from-[#10B981]/90 hover:to-[#059669]/90 text-white',
        },
        {
            label: 'Take Quiz',
            description: 'Test your knowledge',
            icon: ClipboardList,
            onClick: () => router.push('/quiz'),
            className: 'bg-gradient-to-br from-[#F59E0B] to-[#D97706] hover:from-[#F59E0B]/90 hover:to-[#D97706]/90 text-white',
        },
    ];

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid gap-4 sm:grid-cols-3">
                {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <Button
                            key={action.label}
                            onClick={action.onClick}
                            className={`h-auto flex-col gap-2 py-6 rounded-xl ${action.className}`}
                        >
                            <Icon className="h-7 w-7" />
                            <span className="font-semibold">{action.label}</span>
                            <span className="text-xs opacity-80 font-normal">{action.description}</span>
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
