import AppLayout from '@/Layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Save, Users, Calendar } from 'lucide-react';
import { useState, useMemo } from 'react';

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

interface AttendanceRecap {
    student_id: number;
    month: string;
    present: number;
    sick: number;
    permission: number;
    absent: number;
}

export default function MyClass({
    assignment,
    students,
    attendances,
    currentSemester,
    currentAcademicYear,
    semesterStartDate,
    semesterEndDate,
}: {
    assignment: Assignment | null;
    students: Student[];
    attendances: Record<string, Record<number, any>>;
    currentSemester: string;
    currentAcademicYear: string;
    semesterStartDate: string | null;
    semesterEndDate: string | null;
}) {
    // Generate months in semester
    const semesterMonths = useMemo(() => {
        if (!semesterStartDate || !semesterEndDate) return [];
        
        const months = [];
        const start = new Date(semesterStartDate);
        const end = new Date(semesterEndDate);
        
        let current = new Date(start.getFullYear(), start.getMonth(), 1);
        
        while (current <= end) {
            months.push({
                value: `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`,
                label: current.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
            });
            current.setMonth(current.getMonth() + 1);
        }
        
        return months;
    }, [semesterStartDate, semesterEndDate]);

    const [selectedMonth, setSelectedMonth] = useState(semesterMonths[0]?.value || '');
    const [processing, setProcessing] = useState(false);
    
    // Initialize attendance recap for each student
    const [attendanceRecap, setAttendanceRecap] = useState<Record<number, {
        present: string;
        sick: string;
        permission: string;
        absent: string;
    }>>(() => {
        const initial: Record<number, any> = {};
        students.forEach((student) => {
            initial[student.id] = {
                present: '0',
                sick: '0',
                permission: '0',
                absent: '0',
            };
        });
        return initial;
    });

    // Load existing data when month changes
    useMemo(() => {
        if (!selectedMonth) return;
        
        // Calculate total days in selected month
        const [year, month] = selectedMonth.split('-').map(Number);
        const daysInMonth = new Date(year, month, 0).getDate();
        
        // Count attendance from daily records
        const newRecap: Record<number, any> = {};
        students.forEach((student) => {
            const counts = {
                present: 0,
                sick: 0,
                permission: 0,
                absent: 0,
            };
            
            // Count from daily attendance records
            Object.entries(attendances).forEach(([date, dateAttendances]) => {
                if (date.startsWith(selectedMonth)) {
                    const att = dateAttendances[student.id];
                    if (att) {
                        counts[att.status as keyof typeof counts]++;
                    }
                }
            });
            
            newRecap[student.id] = {
                present: counts.present.toString(),
                sick: counts.sick.toString(),
                permission: counts.permission.toString(),
                absent: counts.absent.toString(),
            };
        });
        
        setAttendanceRecap(newRecap);
    }, [selectedMonth, students, attendances]);

    const updateAttendance = (studentId: number, field: 'present' | 'sick' | 'permission' | 'absent', value: string) => {
        // Only allow numbers
        if (value && !/^\d+$/.test(value)) return;
        
        setAttendanceRecap((prev) => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [field]: value,
            },
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        const recapData = students.map((student) => ({
            student_id: student.id,
            month: selectedMonth,
            present: parseInt(attendanceRecap[student.id].present) || 0,
            sick: parseInt(attendanceRecap[student.id].sick) || 0,
            permission: parseInt(attendanceRecap[student.id].permission) || 0,
            absent: parseInt(attendanceRecap[student.id].absent) || 0,
        }));

        router.post(route('teacher.attendance.bulk-store-recap'), {
            class_id: assignment?.class_id,
            month: selectedMonth,
            semester: currentSemester,
            academic_year: currentAcademicYear,
            recaps: recapData,
        }, {
            preserveScroll: true,
            onFinish: () => setProcessing(false),
        });
    };

    const getTotalDays = (studentId: number) => {
        const recap = attendanceRecap[studentId];
        return (parseInt(recap.present) || 0) + 
               (parseInt(recap.sick) || 0) + 
               (parseInt(recap.permission) || 0) + 
               (parseInt(recap.absent) || 0);
    };

    if (!assignment) {
        return (
            <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Absensi', href: '#' }]}>
                <Head title="Absensi Kelas" />
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
                { title: 'Absensi Kelas', href: '#' },
            ]}
        >
            <Head title="Absensi Kelas" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Rekap Absensi Bulanan</h1>
                        <p className="text-muted-foreground mt-2">
                            {assignment.school_class.name} • Semester {currentSemester} • {currentAcademicYear}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pilih Bulan</CardTitle>
                            <CardDescription>Pilih bulan untuk input rekap absensi</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                                    <SelectTrigger className="w-64">
                                        <SelectValue placeholder="Pilih Bulan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {semesterMonths.map((month) => (
                                            <SelectItem key={month.value} value={month.value}>
                                                {month.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Rekap Kehadiran Siswa</CardTitle>
                            <CardDescription>
                                Input jumlah hari untuk setiap status kehadiran siswa dalam bulan {semesterMonths.find(m => m.value === selectedMonth)?.label}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-12">No</TableHead>
                                            <TableHead className="w-32">NIS</TableHead>
                                            <TableHead>Nama Siswa</TableHead>
                                            <TableHead className="text-center w-24">Hadir</TableHead>
                                            <TableHead className="text-center w-24">Sakit</TableHead>
                                            <TableHead className="text-center w-24">Izin</TableHead>
                                            <TableHead className="text-center w-24">Alpha</TableHead>
                                            <TableHead className="text-center w-24">Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {students.map((student, index) => (
                                            <TableRow key={student.id}>
                                                <TableCell className="text-center">{index + 1}</TableCell>
                                                <TableCell className="font-medium">{student.nis}</TableCell>
                                                <TableCell>{student.user.name}</TableCell>
                                                <TableCell>
                                                    <Input
                                                        type="text"
                                                        inputMode="numeric"
                                                        value={attendanceRecap[student.id]?.present}
                                                        onChange={(e) => updateAttendance(student.id, 'present', e.target.value)}
                                                        className="text-center"
                                                        placeholder="0"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        type="text"
                                                        inputMode="numeric"
                                                        value={attendanceRecap[student.id]?.sick}
                                                        onChange={(e) => updateAttendance(student.id, 'sick', e.target.value)}
                                                        className="text-center"
                                                        placeholder="0"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        type="text"
                                                        inputMode="numeric"
                                                        value={attendanceRecap[student.id]?.permission}
                                                        onChange={(e) => updateAttendance(student.id, 'permission', e.target.value)}
                                                        className="text-center"
                                                        placeholder="0"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        type="text"
                                                        inputMode="numeric"
                                                        value={attendanceRecap[student.id]?.absent}
                                                        onChange={(e) => updateAttendance(student.id, 'absent', e.target.value)}
                                                        className="text-center"
                                                        placeholder="0"
                                                    />
                                                </TableCell>
                                                <TableCell className="text-center font-medium">
                                                    {getTotalDays(student.id)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="mt-4 p-4 bg-muted rounded-lg">
                                <h4 className="font-medium mb-2">Keterangan:</h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                    <li>• <strong>Hadir</strong>: Jumlah hari siswa hadir dalam bulan ini</li>
                                    <li>• <strong>Sakit</strong>: Jumlah hari siswa sakit (dengan surat keterangan)</li>
                                    <li>• <strong>Izin</strong>: Jumlah hari siswa izin (dengan surat keterangan)</li>
                                    <li>• <strong>Alpha</strong>: Jumlah hari siswa tidak hadir tanpa keterangan</li>
                                    <li>• <strong>Total</strong>: Jumlah total hari yang diinput (untuk validasi)</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing} size="lg">
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Menyimpan...' : 'Simpan Rekap Absensi'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
