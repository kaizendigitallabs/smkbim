import AppLayout from '@/Layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';

// ...


import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Trash2, Plus, BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { DeleteDialog } from '@/components/delete-dialog';

interface Assignment {
    id: number;
    user_id: number;
    subject_id: number;
    class_id?: number | null;
    academic_year: string;
    user: { id: number; name: string };
    subject: { id: number; name: string };
    school_class?: { id: number; name: string };
}

interface User {
    id: number;
    name: string;
}

interface Subject {
    id: number;
    name: string;
}

interface SchoolClass {
    id: number;
    name: string;
}

export default function SubjectTeacher({
    assignments,
    users,
    subjects,
    classes
}: {
    assignments: Assignment[];
    users: User[];
    subjects: Subject[];
    classes: SchoolClass[];
}) {
    const [open, setOpen] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; item: Assignment | null }>({
        open: false,
        item: null,
    });


    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: '',
        subject_id: '',
        class_id: 'no_class', // 'no_class' means All Classes (null)
        academic_year: '2024/2025',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        router.post(route('api.admin.subject-teacher-assignments.store'), {
            ...data,
            class_id: data.class_id === 'no_class' ? null : data.class_id,
        }, {
            onSuccess: () => {
                setOpen(false);
                reset();
            },
        });
    };

    const columns: ColumnDef<Assignment>[] = [
        {
            accessorKey: 'user.name',
            header: 'Nama Guru',
        },
        {
            accessorKey: 'subject.name',
            header: 'Mata Pelajaran',
        },
        {
            accessorKey: 'school_class',
            header: 'Kelas',
            cell: ({ row }) => (
                row.original.school_class ? row.original.school_class.name : <span className="text-muted-foreground italic">Semua Kelas</span>
            ),
        },
        {
            accessorKey: 'academic_year',
            header: 'Tahun Ajaran',
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteDialog({ open: true, item: row.original })}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Penugasan', href: '#' },
                { title: 'Guru Mapel', href: '#' },
            ]}
        >
            <Head title="Penugasan Guru Mapel" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Penugasan Guru Mapel</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola penugasan guru mata pelajaran
                        </p>
                    </div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Assign Guru Mapel
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Assign Guru Mapel Baru</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Guru</Label>
                                    <Select
                                        onValueChange={(val) => setData('user_id', val)}
                                        value={data.user_id}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Guru" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users.map((u) => (
                                                <SelectItem key={u.id} value={u.id.toString()}>
                                                    {u.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.user_id && <p className="text-sm text-red-500">{errors.user_id}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Mata Pelajaran</Label>
                                    <Select
                                        onValueChange={(val) => setData('subject_id', val)}
                                        value={data.subject_id}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Mapel" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {subjects.map((s) => (
                                                <SelectItem key={s.id} value={s.id.toString()}>
                                                    {s.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.subject_id && <p className="text-sm text-red-500">{errors.subject_id}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Kelas (Opsional)</Label>
                                    <Select
                                        onValueChange={(val) => setData('class_id', val)}
                                        value={data.class_id}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Kelas (Kosongkan untuk Semua)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="no_class">Semua Kelas</SelectItem>
                                            {classes.map((c) => (
                                                <SelectItem key={c.id} value={c.id.toString()}>
                                                    {c.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-muted-foreground">Pilih "Semua Kelas" jika guru mengajar mapel ini di seluruh kelas.</p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Tahun Ajaran</Label>
                                    <Select
                                        onValueChange={(val) => setData('academic_year', val)}
                                        value={data.academic_year}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Tahun" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="2024/2025">2024/2025</SelectItem>
                                            <SelectItem value="2025/2026">2025/2026</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.academic_year && <p className="text-sm text-red-500">{errors.academic_year}</p>}
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button type="submit" disabled={processing}>
                                        Simpan Penugasan
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <DataTable columns={columns} data={assignments} searchColumn="user.name" />

                <DeleteDialog
                    open={deleteDialog.open}
                    onOpenChange={(open) => setDeleteDialog({ open, item: null })}
                    title="Hapus Penugasan"
                    description={`Apakah Anda yakin ingin menghapus penugasan untuk "${deleteDialog.item?.user.name}"?`}
                    deleteUrl={route('api.admin.subject-teacher-assignments.destroy', deleteDialog.item?.id || 0)}
                />
            </div>
        </AppLayout>
    );
}
