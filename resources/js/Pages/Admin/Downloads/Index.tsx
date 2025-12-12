import AppLayout from '@/Layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <AppLayout
             breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Module Restored', href: '#' },
            ]}
        >
            <Head title="Admin Module" />
            <div className="flex flex-1 flex-col gap-4 p-4 text-center">
                 <div className="rounded-xl border border-dashed p-10">
                    <h2 className="text-xl font-bold">Module Restored</h2>
                    <p className="text-muted-foreground">This admin page has been restored.</p>
                </div>
            </div>
        </AppLayout>
    );
}
