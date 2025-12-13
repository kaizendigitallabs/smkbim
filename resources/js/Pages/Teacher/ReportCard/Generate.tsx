import AppLayout from '@/Layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Printer, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface User {
    id: number;
    name: string;
}

interface Student {
    id: number;
    nis: string;
    nisn: string;
    user: User;
    place_of_birth: string;
    date_of_birth: string;
}

interface Subject {
    id: number;
    name: string;
}

interface SubjectGrade {
    subject: Subject;
    teacher: User;
    avgDaily: number;
    avgDailyExam: number;
    scoreMidterm: number;
    scoreFinal: number;
    finalGrade: number;
    predicate: string;
}

interface AttitudeGrade {
    aspect: string;
    grade: string;
    description: string;
}

interface AttendanceSummary {
    present: number;
    sick: number;
    permission: number;
    absent: number;
}

interface Settings {
    headmaster_name: string;
    headmaster_nuks?: string;
    school_address: string;
    city: string;
    report_date?: string;
    footer_text?: string;
}

interface HomeroomNote {
    id: number;
    student_id: number;
    notes: string;
    teacher_id: number;
}

export default function Generate({
    student,
    settings,
    subjectGrades,
    attendanceSummary,
    attitudeGrades,
    homeroomNote,
    semester,
    academicYear,
}: {
    student: Student;
    settings: Settings;
    subjectGrades: SubjectGrade[];
    attendanceSummary: AttendanceSummary;
    attitudeGrades: Record<string, AttitudeGrade>;
    homeroomNote: HomeroomNote | null;
    semester: string;
    academicYear: string;
}) {
    const getGradeColor = (predicate: string) => {
        switch (predicate) {
            case 'A':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'B':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'C':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            default:
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Rapot', href: '#' },
            ]}
        >
            <Head title={`Rapot - ${student.user.name}`} />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Rapot Siswa</h1>
                            <p className="text-muted-foreground mt-2">
                                {student.user.name} • Semester {semester} • {academicYear}
                            </p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={route('teacher.report-card.print', student.id)}>
                            <Printer className="mr-2 h-4 w-4" />
                            Print Rapot
                        </Link>
                    </Button>
                </div>

                {/* Student Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Identitas Siswa</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Nama</p>
                                <p className="font-medium">{student.user.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">NIS / NISN</p>
                                <p className="font-medium">
                                    {student.nis} / {student.nisn}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Tempat, Tanggal Lahir</p>
                                <p className="font-medium">
                                    {student.place_of_birth}, {student.date_of_birth}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Grades */}
                <Card>
                    <CardHeader>
                        <CardTitle>Nilai Mata Pelajaran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">No</TableHead>
                                    <TableHead>Mata Pelajaran</TableHead>
                                    <TableHead className="text-center">Nilai Akhir</TableHead>
                                    <TableHead className="text-center">Predikat</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subjectGrades.map((grade, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-center">{index + 1}</TableCell>
                                        <TableCell>{grade.subject.name}</TableCell>
                                        <TableCell className="text-center font-medium">
                                            {grade.finalGrade}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge className={getGradeColor(grade.predicate)}>
                                                {grade.predicate}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Attendance */}
                <Card>
                    <CardHeader>
                        <CardTitle>Rekap Kehadiran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-600">
                                    {attendanceSummary.present}
                                </p>
                                <p className="text-sm text-muted-foreground">Hadir</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-yellow-600">
                                    {attendanceSummary.sick}
                                </p>
                                <p className="text-sm text-muted-foreground">Sakit</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-blue-600">
                                    {attendanceSummary.permission}
                                </p>
                                <p className="text-sm text-muted-foreground">Izin</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-red-600">
                                    {attendanceSummary.absent}
                                </p>
                                <p className="text-sm text-muted-foreground">Alpha</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Attitude Grades */}
                <Card>
                    <CardHeader>
                        <CardTitle>Nilai Sikap</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {attitudeGrades.spiritual && (
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold">Sikap Spiritual</h4>
                                    <Badge className={getGradeColor(attitudeGrades.spiritual.grade)}>
                                        {attitudeGrades.spiritual.grade}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {attitudeGrades.spiritual.description || '-'}
                                </p>
                            </div>
                        )}
                        {attitudeGrades.social && (
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold">Sikap Sosial</h4>
                                    <Badge className={getGradeColor(attitudeGrades.social.grade)}>
                                        {attitudeGrades.social.grade}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {attitudeGrades.social.description || '-'}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Homeroom Teacher Note */}
                {homeroomNote && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Catatan Wali Kelas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm whitespace-pre-wrap">{homeroomNote.notes}</p>
                        </CardContent>
                    </Card>
                )}

                {/* Footer */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-muted-foreground">Orang Tua/Wali</p>
                                <div className="mt-16 border-t border-gray-300 pt-2">
                                    <p className="text-sm">(...........................)</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm">
                                    {settings.city}, {settings.report_date 
                                        ? new Date(settings.report_date).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })
                                        : new Date().toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })
                                    }
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">Kepala Sekolah</p>
                                <div className="mt-16 border-t border-gray-300 pt-2">
                                    <p className="text-sm font-medium">{settings.headmaster_name}</p>
                                    {settings.headmaster_nuks && (
                                        <p style={{fontSize: '10pt'}}>
                                            NUKS. {settings.headmaster_nuks}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {settings.footer_text && (
                            <div className="mt-6 pt-6 border-t">
                                <p className="text-sm text-muted-foreground text-center">
                                    {settings.footer_text}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
