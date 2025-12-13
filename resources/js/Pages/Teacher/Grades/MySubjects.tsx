import AppLayout from '@/Layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Calendar, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Subject {
    id: number;
    name: string;
    code: string;
}

interface SchoolClass {
    id: number;
    name: string;
}

interface Assignment {
    id: number;
    subject: Subject;
    school_class: SchoolClass;
    academic_year: string;
}

export default function MySubjects({
    assignments,
    currentSemester,
    currentAcademicYear,
}: {
    assignments: Assignment[];
    currentSemester: string;
    currentAcademicYear: string;
}) {
    const validAssignments = assignments.filter(a => a.subject && a.school_class);

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Mata Pelajaran Saya', href: '#' },
            ]}
        >
            <Head title="Mata Pelajaran Saya" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Mata Pelajaran Saya</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola nilai siswa untuk mata pelajaran yang Anda ajar
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-sm">
                            <Calendar className="mr-1 h-3 w-3" />
                            Semester {currentSemester}
                        </Badge>
                        <Badge variant="outline" className="text-sm">
                            {currentAcademicYear}
                        </Badge>
                    </div>
                </div>

                {validAssignments.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Belum Ada Penugasan</h3>
                            <p className="text-muted-foreground text-center max-w-md">
                                Anda belum ditugaskan untuk mengajar mata pelajaran apapun pada semester ini.
                                Silakan hubungi admin untuk penugasan.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {validAssignments.map((assignment) => (
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
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Users className="h-4 w-4" />
                                        <span>{assignment.school_class?.name || 'Unknown Class'}</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={route('teacher.grades.input', { assignmentId: assignment.id, class_id: assignment.school_class?.id })}>
                                                Input Nilai
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={route('teacher.grades.recap', { assignmentId: assignment.id, class_id: assignment.school_class?.id })}>
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
