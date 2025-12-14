import AppLayout from '@/Layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, BarChart3, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
        </AppLayout>
    );
}
