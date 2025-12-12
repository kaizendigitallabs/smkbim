import AppLayout from '@/Layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Settings', href: '#' },
            ]}
        >
            <Head title="Settings" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground mt-2">
                        Pengaturan aplikasi
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <SettingsIcon className="h-5 w-5" />
                            Pengaturan Umum
                        </CardTitle>
                        <CardDescription>
                            Halaman pengaturan sedang dalam pengembangan
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Fitur pengaturan akan segera tersedia. Saat ini Anda dapat menggunakan menu lain untuk mengelola konten website.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
