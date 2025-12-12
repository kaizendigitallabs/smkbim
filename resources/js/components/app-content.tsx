import { SidebarInset } from '@/components/ui/sidebar';
import { type ReactNode } from 'react';

export function AppContent({
    variant = 'header',
    children,
}: {
    variant?: 'header' | 'sidebar';
    children: ReactNode;
}) {
    if (variant === 'sidebar') {
        return (
            <SidebarInset>
                {children}
            </SidebarInset>
        );
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0 text-foreground">
            {children}
        </main>
    );
}
