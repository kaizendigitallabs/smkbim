import AppLayout from '@/Layouts/app-layout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ArrowLeft, Plus, Pencil, Trash2, Save } from 'lucide-react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { DeleteDialog } from '@/components/delete-dialog';

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

interface Grade {
    id: number;
    student_id: number;
    type: string;
    score: number;
    description?: string;
    date: string;
}

export default function InputForm({
    assignment,
    students,
    grades,
    currentSemester,
    currentAcademicYear,
}: {
    assignment: Assignment;
    students: Student[];
    grades: Record<number, Grade[]>;
    currentSemester: string;
    currentAcademicYear: string;
}) {
    const [gradeDialog, setGradeDialog] = useState<{
        open: boolean;
        student?: Student;
        grade?: Grade;
        type?: string;
    }>({ open: false });
    
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; grade?: Grade }>({
        open: false,
    });

    const { data, setData, post, put, processing, errors, reset } = useForm({
        student_id: 0,
        subject_teacher_assignment_id: assignment.id,
        type: 'daily',
        score: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        semester: currentSemester,
        academic_year: currentAcademicYear,
    });

    const handleOpenDialog = (student: Student, type: string, grade?: Grade) => {
        if (grade) {
            setData({
                ...data,
                student_id: student.id,
                type: grade.type,
                score: grade.score.toString(),
                description: grade.description || '',
                date: grade.date,
            });
        } else {
            setData({
                ...data,
                student_id: student.id,
                type,
                score: '',
                description: '',
                date: new Date().toISOString().split('T')[0],
            });
        }
        setGradeDialog({ open: true, student, grade, type });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (gradeDialog.grade) {
            // Update existing grade
            put(route('teacher.grades.update', gradeDialog.grade.id), {
                onSuccess: () => {
                    setGradeDialog({ open: false });
                    reset();
                },
            });
        } else {
            // Create new grade
            post(route('teacher.grades.store'), {
                onSuccess: () => {
                    setGradeDialog({ open: false });
                    reset();
                },
            });
        }
    };

    const getStudentGrades = (studentId: number, type: string): Grade[] => {
        const studentGrades = grades[studentId] || [];
        return studentGrades.filter((g) => g.type === type);
    };

    const renderGradeCell = (student: Student, type: string) => {
        const studentGrades = getStudentGrades(student.id, type);
        
        if (type === 'midterm' || type === 'final') {
            // UTS/UAS - only one grade allowed
            const grade = studentGrades[0];
            return (
                <div className="flex items-center gap-2">
                    {grade ? (
                        <>
                            <span className="font-medium">{grade.score}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => handleOpenDialog(student, type, grade)}
                            >
                                <Pencil className="h-3 w-3" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => setDeleteDialog({ open: true, grade })}
                            >
                                <Trash2 className="h-3 w-3 text-destructive" />
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDialog(student, type)}
                        >
                            <Plus className="mr-1 h-3 w-3" />
                            Input
                        </Button>
                    )}
                </div>
            );
        } else {
            // Daily/Daily Exam - multiple grades allowed
            return (
                <div className="space-y-1">
                    {studentGrades.map((grade) => (
                        <div key={grade.id} className="flex items-center gap-2 text-sm">
                            <span className="font-medium">{grade.score}</span>
                            {grade.description && (
                                <span className="text-xs text-muted-foreground">
                                    ({grade.description})
                                </span>
                            )}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleOpenDialog(student, type, grade)}
                            >
                                <Pencil className="h-3 w-3" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => setDeleteDialog({ open: true, grade })}
                            >
                                <Trash2 className="h-3 w-3 text-destructive" />
                            </Button>
                        </div>
                    ))}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDialog(student, type)}
                    >
                        <Plus className="mr-1 h-3 w-3" />
                        Tambah
                    </Button>
                </div>
            );
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Mata Pelajaran', href: route('teacher.grades.my-subjects') },
                { title: 'Input Nilai', href: '#' },
            ]}
        >
            <Head title={`Input Nilai - ${assignment.subject.name}`} />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('teacher.grades.my-subjects')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {assignment.subject.name}
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            {assignment.school_class.name} • Semester {currentSemester} • {currentAcademicYear}
                        </p>
                    </div>
                </div>

                <Tabs defaultValue="daily" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="daily">Nilai Harian</TabsTrigger>
                        <TabsTrigger value="daily_exam">Ujian Harian</TabsTrigger>
                        <TabsTrigger value="midterm">UTS</TabsTrigger>
                        <TabsTrigger value="final">UAS</TabsTrigger>
                    </TabsList>

                    {(['daily', 'daily_exam', 'midterm', 'final'] as const).map((type) => (
                        <TabsContent key={type} value={type}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        {type === 'daily' && 'Nilai Harian'}
                                        {type === 'daily_exam' && 'Nilai Ujian Harian'}
                                        {type === 'midterm' && 'Nilai UTS'}
                                        {type === 'final' && 'Nilai UAS'}
                                    </CardTitle>
                                    <CardDescription>
                                        {type === 'daily' && 'Input nilai tugas dan kuis harian siswa'}
                                        {type === 'daily_exam' && 'Input nilai ujian harian per bab/topik'}
                                        {type === 'midterm' && 'Input nilai Ujian Tengah Semester'}
                                        {type === 'final' && 'Input nilai Ujian Akhir Semester'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-20">NIS</TableHead>
                                                <TableHead>Nama Siswa</TableHead>
                                                <TableHead>Nilai</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {students.map((student) => (
                                                <TableRow key={student.id}>
                                                    <TableCell className="font-medium">
                                                        {student.nis}
                                                    </TableCell>
                                                    <TableCell>{student.user.name}</TableCell>
                                                    <TableCell>
                                                        {renderGradeCell(student, type)}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>

            {/* Grade Input Dialog */}
            <Dialog open={gradeDialog.open} onOpenChange={(open) => setGradeDialog({ open })}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {gradeDialog.grade ? 'Edit Nilai' : 'Input Nilai'}
                        </DialogTitle>
                        <DialogDescription>
                            {gradeDialog.student?.user.name} ({gradeDialog.student?.nis})
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="score">Nilai *</Label>
                            <Input
                                id="score"
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                                value={data.score}
                                onChange={(e) => setData('score', e.target.value)}
                                placeholder="0-100"
                            />
                            {errors.score && (
                                <p className="text-sm text-destructive">{errors.score}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Tanggal *</Label>
                            <Input
                                id="date"
                                type="date"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                            />
                            {errors.date && (
                                <p className="text-sm text-destructive">{errors.date}</p>
                            )}
                        </div>

                        {(data.type === 'daily' || data.type === 'daily_exam') && (
                            <div className="space-y-2">
                                <Label htmlFor="description">Keterangan</Label>
                                <Input
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Contoh: Tugas Bab 1, Kuis Harian"
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>
                        )}

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setGradeDialog({ open: false })}
                            >
                                Batal
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <DeleteDialog
                open={deleteDialog.open}
                onOpenChange={(open) => setDeleteDialog({ open })}
                title="Hapus Nilai"
                description="Apakah Anda yakin ingin menghapus nilai ini? Tindakan ini tidak dapat dibatalkan."
                deleteUrl={route('teacher.grades.destroy', deleteDialog.grade?.id || 0)}
            />
        </AppLayout>
    );
}
