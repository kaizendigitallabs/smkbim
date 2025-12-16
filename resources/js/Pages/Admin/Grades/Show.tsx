import AppLayout from '@/Layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, BarChart3, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Upload, Download } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useForm as useInertiaForm } from '@inertiajs/react';

interface Subject {
    id: number;
    name: string;
    code: string;
}

interface User {
    id: number;
    name: string;
}

interface SchoolClass {
    id: number;
    name: string;
}

interface Assignment {
    id: number;
    subject: Subject;
    user: User;
    school_class?: SchoolClass;
    academic_year: string;
}

export default function Show({
    schoolClass,
    assignments,
    currentAcademicYear,
}: {
    schoolClass: SchoolClass;
    assignments: Assignment[];
    currentAcademicYear: string;
}) {
    const [importOpen, setImportOpen] = useState(false);
    
    const { data, setData, post, processing, errors, reset, clearErrors } = useInertiaForm({
        file: null as File | null,
    });

    const handleImport = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.grades.bulk-import', schoolClass.id), {
            onSuccess: () => {
                setImportOpen(false);
                reset();
            },
        });
    };
    
    const handleTemplate = () => {
        window.location.href = route('admin.grades.bulk-template', schoolClass.id);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Kelola Nilai', href: route('admin.grades.index') },
                { title: schoolClass.name, href: '#' },
            ]}
        >
            <Head title={`Kelola Nilai - ${schoolClass.name}`} />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                     <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.grades.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold tracking-tight">{schoolClass.name}</h1>
                        <p className="text-muted-foreground mt-2">
                             Daftar Mata Pelajaran
                        </p>
                    </div>
                     <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={() => setImportOpen(true)}>
                            <Upload className="mr-2 h-4 w-4" />
                            Import Nilai (Semua Mapel)
                        </Button>
                        <Badge variant="outline" className="text-sm">
                            <Calendar className="mr-1 h-3 w-3" />
                            {currentAcademicYear}
                        </Badge>
                    </div>
                </div>

                {assignments.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Belum Ada Mata Pelajaran</h3>
                            <p className="text-muted-foreground text-center max-w-md">
                                Belum ada mata pelajaran yang ditugaskan untuk kelas ini.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {assignments.map((assignment) => (
                            <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                                <BookOpen className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg">
                                                    {assignment.subject.name}
                                                </CardTitle>
                                                <CardDescription className="text-xs">
                                                    {assignment.subject.code}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <div className="text-sm text-muted-foreground">
                                        Guru: <span className="font-medium text-foreground">{assignment.user.name}</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={route('admin.grades.input', { assignmentId: assignment.id, class_id: schoolClass.id })}>
                                                Input Nilai
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={route('admin.grades.recap', { assignmentId: assignment.id, class_id: schoolClass.id })}>
                                                <BarChart3 className="mr-1 h-4 w-4" />
                                                Rekap
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <Dialog open={importOpen} onOpenChange={setImportOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Import Nilai Kolektif</DialogTitle>
                        <DialogDescription>
                            Import nilai untuk semua mata pelajaran sekaligus. Gunakan template yang disediakan.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="mb-4">
                        <Button variant="outline" onClick={handleTemplate} className="w-full">
                            <Download className="mr-2 h-4 w-4" />
                            Download Template (Semua Mapel)
                        </Button>
                    </div>

                    <form onSubmit={handleImport} className="space-y-4">
                         <div className="bg-blue-50 p-3 rounded-md border border-blue-100 text-sm text-blue-700 mb-2">
                             <strong>Catatan:</strong> File template kini memiliki sheet/halaman terpisah untuk setiap jenis nilai (Harian, UTS, UAS). Silakan isi sesuai sheet yang tersedia.
                         </div>

                        <div className="space-y-2">
                            <Label htmlFor="file">File Excel</Label>
                            <Input
                                id="file"
                                type="file"
                                accept=".xlsx, .xls"
                                onChange={(e) => setData('file', e.target.files ? e.target.files[0] : null)}
                            />
                            {errors.file && <p className="text-sm text-destructive">{errors.file}</p>}
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setImportOpen(false)}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Mengupload...' : 'Import'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );

}
