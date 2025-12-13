import AppLayout from '@/Layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Users, FileText, Printer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface User {
    id: number;
    name: string;
}

interface Student {
    id: number;
    nis: string;
    user: User;
}

interface SchoolClass {
    id: number;
    name: string;
}

interface Assignment {
    id: number;
    class_id: number;
    school_class: SchoolClass;
}

export default function MyClass({
    assignment,
    students,
    currentSemester,
    currentAcademicYear,
}: {
    assignment: Assignment | null;
    students: Student[];
    currentSemester: string;
    currentAcademicYear: string;
}) {
    if (!assignment) {
        return (
            <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Cetak Rapot', href: '#' }]}>
                <Head title="Cetak Rapot" />
                <div className="space-y-6 p-6">
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Users className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Belum Ada Penugasan</h3>
                            <p className="text-muted-foreground text-center max-w-md">
                                Anda belum ditugaskan sebagai wali kelas. Silakan hubungi admin.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Cetak Rapot', href: '#' },
            ]}
        >
            <Head title="Cetak Rapot" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Cetak Rapot</h1>
                        <p className="text-muted-foreground mt-2">
                            {assignment.school_class.name} • Semester {currentSemester} • {currentAcademicYear}
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Siswa</CardTitle>
                        <CardDescription>
                            Pilih siswa untuk melihat atau mencetak rapot
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-16">No</TableHead>
                                    <TableHead className="w-32">NIS</TableHead>
                                    <TableHead>Nama Siswa</TableHead>
                                    <TableHead className="w-32">Semester</TableHead>
                                    <TableHead className="text-right w-48">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                            Tidak ada siswa di kelas ini
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    students.map((student, index) => (
                                        <TableRow key={student.id}>
                                            <TableCell className="text-center">{index + 1}</TableCell>
                                            <TableCell className="font-medium">{student.nis}</TableCell>
                                            <TableCell>{student.user.name}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {currentSemester} {currentAcademicYear}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <a href={route('teacher.report-card.generate', student.id)}>
                                                            <FileText className="mr-2 h-4 w-4" />
                                                            Lihat Rapot
                                                        </a>
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <a href={route('teacher.report-card.print', student.id)} target="_blank" rel="noopener noreferrer">
                                                            <Printer className="mr-2 h-4 w-4" />
                                                            Cetak
                                                        </a>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="bg-muted/50">
                    <CardHeader>
                        <CardTitle className="text-base">Informasi</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground">
                        <p>• <strong>Lihat Rapot</strong>: Menampilkan rapot siswa di browser untuk preview</p>
                        <p>• <strong>Cetak</strong>: Membuka halaman cetak rapot (siap untuk print atau save as PDF)</p>
                        <p>• Pastikan semua nilai sudah diinput sebelum mencetak rapot</p>
                        <p>• Rapot akan menampilkan nilai akademik, sikap, dan absensi siswa</p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
