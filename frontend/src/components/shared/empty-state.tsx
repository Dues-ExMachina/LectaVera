import React from 'react';
import { FileText, BookOpen, Brain, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

const defaultIcons = {
    document: <FileText className="h-12 w-12 text-muted-foreground/50" />,
    bookshelf: <BookOpen className="h-12 w-12 text-muted-foreground/50" />,
    study: <Brain className="h-12 w-12 text-muted-foreground/50" />,
    quiz: <ClipboardList className="h-12 w-12 text-muted-foreground/50" />,
};

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                {icon || defaultIcons.document}
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>
            {action && (
                <Button
                    onClick={action.onClick}
                    className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white"
                >
                    {action.label}
                </Button>
            )}
        </div>
    );
}
