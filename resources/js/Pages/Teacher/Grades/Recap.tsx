import AppLayout from '@/Layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
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
import { ArrowLeft, FileText } from 'lucide-react';
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
}

interface StudentRecap {
    student: Student;
    avgDaily: number;
    avgDailyExam: number;
    scoreMidterm: number;
    scoreFinal: number;
    finalGrade: number;
    dailyCount: number;
    dailyExamCount: number;
}

export default function Recap({
    assignment,
    students,
    currentSemester,
    currentAcademicYear,
    gradeRoutePrefix = 'teacher.grades',
    backRoute,
}: {
    assignment: Assignment;
    students: StudentRecap[];
    currentSemester: string;
    currentAcademicYear: string;
    gradeRoutePrefix?: string;
    backRoute?: string;
}) {
    const getGradeColor = (grade: number) => {
        if (grade >= 85) return 'text-green-600 dark:text-green-400';
        if (grade >= 70) return 'text-blue-600 dark:text-blue-400';
        if (grade >= 60) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    const getGradePredicate = (grade: number) => {
        if (grade >= 85) return 'A';
        if (grade >= 70) return 'B';
        if (grade >= 60) return 'C';
        if (grade >= 50) return 'D';
        return 'E';
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Mata Pelajaran', href: backRoute || route('teacher.grades.my-subjects') },
                { title: 'Rekap Nilai', href: '#' },
            ]}
        >
            <Head title={`Rekap Nilai - ${assignment.subject.name}`} />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={backRoute || route('teacher.grades.my-subjects')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Rekap Nilai - {assignment.subject.name}
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            {assignment.school_class.name} • Semester {currentSemester} • {currentAcademicYear}
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={route(`${gradeRoutePrefix}.input`, { assignmentId: assignment.id, class_id: assignment.school_class.id })}>
                            <FileText className="mr-2 h-4 w-4" />
                            Input Nilai
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Rekap Nilai Siswa</CardTitle>
                        <CardDescription>
                            Rumus: Nilai Akhir = (Rata-rata Harian × 30%) + (Rata-rata Ujian Harian × 30%) + (UTS × 15%) + (UAS × 25%)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-16">No</TableHead>
                                        <TableHead className="w-24">NIS</TableHead>
                                        <TableHead>Nama Siswa</TableHead>
                                        <TableHead className="text-center">
                                            <div>Rata-rata</div>
                                            <div className="text-xs font-normal text-muted-foreground">
                                                Harian (30%)
                                            </div>
                                        </TableHead>
                                        <TableHead className="text-center">
                                            <div>Rata-rata</div>
                                            <div className="text-xs font-normal text-muted-foreground">
                                                Ujian (30%)
                                            </div>
                                        </TableHead>
                                        <TableHead className="text-center">
                                            <div>UTS</div>
                                            <div className="text-xs font-normal text-muted-foreground">
                                                (15%)
                                            </div>
                                        </TableHead>
                                        <TableHead className="text-center">
                                            <div>UAS</div>
                                            <div className="text-xs font-normal text-muted-foreground">
                                                (25%)
                                            </div>
                                        </TableHead>
                                        <TableHead className="text-center font-bold">
                                            Nilai Akhir
                                        </TableHead>
                                        <TableHead className="text-center">Predikat</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {students.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                                                Belum ada data nilai
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        students.map((studentRecap, index) => (
                                            <TableRow key={studentRecap.student.id}>
                                                <TableCell className="text-center">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {studentRecap.student.nis}
                                                </TableCell>
                                                <TableCell>
                                                    {studentRecap.student.user.name}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div>{studentRecap.avgDaily.toFixed(2)}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        ({studentRecap.dailyCount} nilai)
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div>{studentRecap.avgDailyExam.toFixed(2)}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        ({studentRecap.dailyExamCount} nilai)
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {studentRecap.scoreMidterm > 0
                                                        ? studentRecap.scoreMidterm.toFixed(2)
                                                        : '-'}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {studentRecap.scoreFinal > 0
                                                        ? studentRecap.scoreFinal.toFixed(2)
                                                        : '-'}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <span
                                                        className={`text-lg font-bold ${getGradeColor(
                                                            studentRecap.finalGrade
                                                        )}`}
                                                    >
                                                        {studentRecap.finalGrade.toFixed(2)}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge
                                                        variant={
                                                            studentRecap.finalGrade >= 70
                                                                ? 'default'
                                                                : 'destructive'
                                                        }
                                                    >
                                                        {getGradePredicate(studentRecap.finalGrade)}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Keterangan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold mb-2">Predikat Nilai:</h4>
                                <ul className="space-y-1 text-muted-foreground">
                                    <li>A = 85 - 100 (Sangat Baik)</li>
                                    <li>B = 70 - 84 (Baik)</li>
                                    <li>C = 60 - 69 (Cukup)</li>
                                    <li>D = 50 - 59 (Kurang)</li>
                                    <li>E = 0 - 49 (Sangat Kurang)</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Bobot Penilaian:</h4>
                                <ul className="space-y-1 text-muted-foreground">
                                    <li>Nilai Harian: 30%</li>
                                    <li>Ujian Harian: 30%</li>
                                    <li>UTS: 15%</li>
                                    <li>UAS: 25%</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
