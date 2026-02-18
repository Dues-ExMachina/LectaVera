import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] shadow-lg mb-6">
                <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-6xl font-bold text-foreground font-serif mb-2">404</h1>
            <h2 className="text-xl font-semibold text-foreground mb-2">Page Not Found</h2>
            <p className="text-muted-foreground text-center max-w-md mb-8">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Button asChild className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white">
                <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
        </div>
    );
}
