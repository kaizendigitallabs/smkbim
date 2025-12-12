import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { type ReactNode } from 'react';

export function AppShell({
    children,
    variant = 'header',
}: {
    children: ReactNode;
    variant?: 'header' | 'sidebar';
}) {
    if (variant === 'header') {
        return (
            <div className="flex min-h-screen w-full flex-col">{children}</div>
        );
    }

    return (
        <SidebarProvider defaultOpen={true}>
            {children}
        </SidebarProvider>
    );
}
