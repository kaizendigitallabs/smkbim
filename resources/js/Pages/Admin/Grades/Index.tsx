import AppLayout from '@/Layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, ChevronRight } from 'lucide-react';

interface SchoolClass {
    id: number;
    name: string;
}

export default function Index({ classes }: { classes: SchoolClass[] }) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Kelola Nilai', href: '#' },
            ]}
        >
            <Head title="Kelola Nilai - Pilih Kelas" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Kelola Nilai</h1>
                    <p className="text-muted-foreground mt-2">
                        Pilih kelas untuk mengelola nilai siswa.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {classes.map((schoolClass) => (
                        <Card key={schoolClass.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Kelas
                                </CardTitle>
                                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{schoolClass.name}</div>
                                <Button className="w-full mt-4" variant="outline" asChild>
                                    <Link href={route('admin.grades.show', schoolClass.id)}>
                                        Pilih Kelas <ChevronRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                    {classes.length === 0 && (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            Belum ada data kelas.
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
