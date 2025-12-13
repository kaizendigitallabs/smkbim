import AppLayout from '@/Layouts/app-layout';
import { Head, router } from '@inertiajs/react';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Save, Users, Heart, Smile, Edit, FileText } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

interface AttitudeGrade {
    id: number;
    student_id: number;
    aspect: string;
    grade: string;
    description?: string;
}

interface HomeroomNote {
    id: number;
    student_id: number;
    notes: string;
}

export default function MyClass({
    assignment,
    students,
    attitudeGrades,
    homeroomNotes,
    currentSemester,
    currentAcademicYear,
}: {
    assignment: Assignment | null;
    students: Student[];
    attitudeGrades: Record<number, AttitudeGrade[]>;
    homeroomNotes: Record<number, HomeroomNote>;
    currentSemester: string;
    currentAcademicYear: string;
}) {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [processing, setProcessing] = useState(false);
    
    const [studentGrades, setStudentGrades] = useState<{
        spiritual: { grade: string; description: string };
        social: { grade: string; description: string };
    }>({
        spiritual: { grade: 'B', description: '' },
        social: { grade: 'B', description: '' },
    });

    const [note, setNote] = useState('');

    const handleSelectStudent = (student: Student) => {
        setSelectedStudent(student);
        
        // Load existing grades
        const grades = attitudeGrades[student.id] || [];
        const spiritual = grades.find((g) => g.aspect === 'spiritual');
        const social = grades.find((g) => g.aspect === 'social');
        
        setStudentGrades({
            spiritual: {
                grade: spiritual?.grade || 'B',
                description: spiritual?.description || '',
            },
            social: {
                grade: social?.grade || 'B',
                description: social?.description || '',
            },
        });

        // Load existing note
        setNote(homeroomNotes[student.id]?.notes || '');
    };

    const updateGrade = (aspect: 'spiritual' | 'social', field: 'grade' | 'description', value: string) => {
        setStudentGrades((prev) => ({
            ...prev,
            [aspect]: {
                ...prev[aspect],
                [field]: value,
            },
        }));
    };

    const handleSave = (aspect: 'spiritual' | 'social') => {
        if (!selectedStudent) return;
        
        setProcessing(true);
        const gradeData = studentGrades[aspect];
        
        router.post(route('teacher.attitude-grades.store'), {
            student_id: selectedStudent.id,
            class_id: assignment?.class_id,
            aspect,
            grade: gradeData.grade,
            description: gradeData.description,
            semester: currentSemester,
            academic_year: currentAcademicYear,
        }, {
            preserveScroll: true,
            onFinish: () => setProcessing(false),
        });
    };

    const handleSaveNote = () => {
        if (!selectedStudent) return;
        
        setProcessing(true);
        router.post(route('teacher.attitude-grades.store-note'), {
            student_id: selectedStudent.id,
            notes: note,
            semester: currentSemester,
            academic_year: currentAcademicYear,
        }, {
            preserveScroll: true,
            onFinish: () => setProcessing(false),
        });
    };

    const getStudentStatus = (studentId: number) => {
        const grades = attitudeGrades[studentId] || [];
        const hasSpiritual = grades.some((g) => g.aspect === 'spiritual');
        const hasSocial = grades.some((g) => g.aspect === 'social');
        const hasNote = !!homeroomNotes[studentId];

        if (hasSpiritual && hasSocial && hasNote) return 'complete';
        if (hasSpiritual || hasSocial || hasNote) return 'partial';
        return 'empty';
    };

    if (!assignment) {
        return (
            <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Nilai Sikap', href: '#' }]}>
                <Head title="Nilai Sikap" />
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
                { title: 'Nilai Sikap', href: '#' },
            ]}
        >
            <Head title="Nilai Sikap" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Nilai Sikap</h1>
                        <p className="text-muted-foreground mt-2">
                            {assignment.school_class.name} • Semester {currentSemester} • {currentAcademicYear}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Student List */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Daftar Siswa</CardTitle>
                                <CardDescription>Pilih siswa untuk input nilai sikap</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {students.map((student) => {
                                        const status = getStudentStatus(student.id);
                                        return (
                                            <button
                                                key={student.id}
                                                onClick={() => handleSelectStudent(student)}
                                                className={`
                                                    w-full text-left p-3 rounded-lg border-2 transition-all
                                                    ${selectedStudent?.id === student.id 
                                                        ? 'border-primary bg-primary/10' 
                                                        : 'border-transparent hover:border-primary/50'
                                                    }
                                                `}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-medium">{student.user.name}</div>
                                                        <div className="text-sm text-muted-foreground">NIS: {student.nis}</div>
                                                    </div>
                                                    {status === 'complete' && (
                                                        <Badge variant="default" className="bg-green-500">Lengkap</Badge>
                                                    )}
                                                    {status === 'partial' && (
                                                        <Badge variant="secondary">Sebagian</Badge>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Input Form */}
                    <div className="lg:col-span-2">
                        {!selectedStudent ? (
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center py-12">
                                    <Edit className="h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">Pilih Siswa</h3>
                                    <p className="text-muted-foreground text-center max-w-md">
                                        Pilih siswa dari daftar di sebelah kiri untuk mulai input nilai sikap
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <Tabs defaultValue="attitude" className="space-y-4">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="attitude">Nilai Sikap</TabsTrigger>
                                    <TabsTrigger value="note">Catatan Wali Kelas</TabsTrigger>
                                </TabsList>

                                {/* Attitude Grades Tab */}
                                <TabsContent value="attitude" className="space-y-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Nilai Sikap - {selectedStudent.user.name}</CardTitle>
                                            <CardDescription>NIS: {selectedStudent.nis}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            {/* Spiritual */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <Heart className="h-5 w-5 text-purple-500" />
                                                    <h4 className="font-semibold">Sikap Spiritual</h4>
                                                </div>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="text-sm font-medium mb-2 block">Predikat</label>
                                                        <Select
                                                            value={studentGrades.spiritual.grade}
                                                            onValueChange={(value) => updateGrade('spiritual', 'grade', value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="A">A (Sangat Baik)</SelectItem>
                                                                <SelectItem value="B">B (Baik)</SelectItem>
                                                                <SelectItem value="C">C (Cukup)</SelectItem>
                                                                <SelectItem value="D">D (Kurang)</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium mb-2 block">Deskripsi</label>
                                                        <Textarea
                                                            value={studentGrades.spiritual.description}
                                                            onChange={(e) => updateGrade('spiritual', 'description', e.target.value)}
                                                            placeholder="Deskripsi sikap spiritual siswa..."
                                                            rows={3}
                                                        />
                                                    </div>
                                                    <Button
                                                        onClick={() => handleSave('spiritual')}
                                                        disabled={processing}
                                                        className="w-full"
                                                    >
                                                        <Save className="mr-2 h-4 w-4" />
                                                        Simpan Nilai Spiritual
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="border-t" />

                                            {/* Social */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <Smile className="h-5 w-5 text-blue-500" />
                                                    <h4 className="font-semibold">Sikap Sosial</h4>
                                                </div>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="text-sm font-medium mb-2 block">Predikat</label>
                                                        <Select
                                                            value={studentGrades.social.grade}
                                                            onValueChange={(value) => updateGrade('social', 'grade', value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="A">A (Sangat Baik)</SelectItem>
                                                                <SelectItem value="B">B (Baik)</SelectItem>
                                                                <SelectItem value="C">C (Cukup)</SelectItem>
                                                                <SelectItem value="D">D (Kurang)</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium mb-2 block">Deskripsi</label>
                                                        <Textarea
                                                            value={studentGrades.social.description}
                                                            onChange={(e) => updateGrade('social', 'description', e.target.value)}
                                                            placeholder="Deskripsi sikap sosial siswa..."
                                                            rows={3}
                                                        />
                                                    </div>
                                                    <Button
                                                        onClick={() => handleSave('social')}
                                                        disabled={processing}
                                                        className="w-full"
                                                    >
                                                        <Save className="mr-2 h-4 w-4" />
                                                        Simpan Nilai Sosial
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Keterangan Predikat</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-1 text-sm text-muted-foreground">
                                                <li>A = Sangat Baik (Selalu menunjukkan sikap yang sangat baik)</li>
                                                <li>B = Baik (Sering menunjukkan sikap yang baik)</li>
                                                <li>C = Cukup (Kadang-kadang menunjukkan sikap yang baik)</li>
                                                <li>D = Kurang (Belum menunjukkan sikap yang baik)</li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Homeroom Note Tab */}
                                <TabsContent value="note">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Catatan Wali Kelas - {selectedStudent.user.name}</CardTitle>
                                            <CardDescription>
                                                Catatan khusus untuk siswa ini (akan muncul di rapot)
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <FileText className="h-5 w-5" />
                                                <p className="text-sm">
                                                    Catatan ini berbeda dengan deskripsi nilai sikap. Gunakan untuk memberikan 
                                                    catatan umum tentang perkembangan siswa selama semester ini.
                                                </p>
                                            </div>
                                            <Textarea
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                                placeholder="Contoh: Siswa menunjukkan perkembangan yang baik dalam hal kedisiplinan dan tanggung jawab..."
                                                rows={6}
                                            />
                                            <Button
                                                onClick={handleSaveNote}
                                                disabled={processing}
                                                className="w-full"
                                            >
                                                <Save className="mr-2 h-4 w-4" />
                                                Simpan Catatan Wali Kelas
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
