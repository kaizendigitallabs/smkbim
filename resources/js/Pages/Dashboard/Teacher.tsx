import AppLayout from '@/Layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Calendar, Clock, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Stats {
    subjectsCount: number;
}

export default function TeacherDashboard({ stats }: { stats: Stats }) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
            ]}
        >
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
                 {/* Workspace Banner */}
                 <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-lg">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight mb-2">Ruang Guru</h2>
                            <p className="text-slate-400">
                                Kelola kegiatan belajar mengajar, input nilai, dan materi pelajaran.
                            </p>
                        </div>
                        <div className="flex gap-3">
                             <Button className="bg-emerald-500 hover:bg-emerald-600 text-white" asChild>
                                <Link href={route('teacher.grades.my-subjects')}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Input Nilai
                                </Link>
                            </Button>
                        </div>
                    </div>
                     {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="bg-gradient-to-br from-blue-50 to-white shadow-sm border-blue-100">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-800">Mapel Diampu</CardTitle>
                            <BookOpen className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-blue-600">{stats.subjectsCount}</div>
                            <p className="text-xs text-muted-foreground">Mata pelajaran aktif</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm">
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Jadwal Hari Ini</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-semibold">Kosong</div>
                            <p className="text-xs text-muted-foreground">Tidak ada jadwal mengajar hari ini.</p>
                        </CardContent>
                    </Card>
                     <Card className="shadow-sm">
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Kalender Akademik</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-semibold">Desember 2024</div>
                            <p className="text-xs text-muted-foreground">Akhir Semester Ganjil</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Daftar Mata Pelajaran Anda</h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {/* Placeholder for Subject Cards */}
                        {Array.from({ length: stats.subjectsCount }).map((_, i) => (
                             <div key={i} className="group relative flex items-center gap-x-4 rounded-xl border p-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900 group-hover:bg-white dark:group-hover:bg-indigo-950">
                                  <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                                </div>
                                <div className="flex-auto">
                                  <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
                                    <a href="#">
                                      <span className="absolute inset-0" />
                                      Nama Mapel {i + 1}
                                    </a>
                                  </h3>
                                  <p className="text-xs text-gray-500">Kelas X - XII</p>
                                </div>
                              </div>
                        ))}
                        {stats.subjectsCount === 0 && (
                            <p className="text-muted-foreground text-sm col-span-3 text-center py-8">Belum ada mata pelajaran yang ditugaskan.</p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
