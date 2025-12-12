import AppLayout from '@/Layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function Index() {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'PPDB', href: '#' },
            ]}
        >
            <Head title="PPDB" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">PPDB</h1>
                    <p className="text-muted-foreground mt-2">
                        Penerimaan Peserta Didik Baru
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Manajemen PPDB
                        </CardTitle>
                        <CardDescription>
                            Halaman PPDB sedang dalam pengembangan
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Fitur manajemen PPDB akan segera tersedia untuk mengelola pendaftaran siswa baru.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
