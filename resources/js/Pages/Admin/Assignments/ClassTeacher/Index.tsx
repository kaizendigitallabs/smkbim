import AppLayout from '@/Layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Trash2, Plus, UserCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { DeleteDialog } from '@/components/delete-dialog';

interface Assignment {
    id: number;
    user_id: number;
    class_id: number;
    academic_year: string;
    user: { id: number; name: string };
    school_class: { id: number; name: string };
}

interface User {
    id: number;
    name: string;
}

interface SchoolClass {
    id: number;
    name: string;
}

export default function ClassTeacher({
    assignments,
    users,
    classes,
    activeAcademicYear
}: {
    assignments: Assignment[];
    users: User[];
    classes: SchoolClass[];
    activeAcademicYear: string;
}) {
    const [open, setOpen] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; item: Assignment | null }>({
        open: false,
        item: null,
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: '',
        class_id: '',
        academic_year: activeAcademicYear,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('api.admin.class-teacher-assignments.store'), {
            onSuccess: () => {
                setOpen(false);
                reset();
            },
        });
    };

    const columns: ColumnDef<Assignment>[] = [
        {
            accessorKey: 'user.name',
            header: 'Nama Guru (Wali Kelas)',
        },
        {
            accessorKey: 'school_class.name',
            header: 'Kelas',
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
                { title: 'Wali Kelas', href: '#' },
            ]}
        >
            <Head title="Penugasan Wali Kelas" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Penugasan Wali Kelas</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola penugasan wali kelas untuk setiap kelas
                        </p>
                    </div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Assign Wali Kelas
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Assign Wali Kelas Baru</DialogTitle>
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
                                    <Label>Kelas</Label>
                                    <Select
                                        onValueChange={(val) => setData('class_id', val)}
                                        value={data.class_id}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Kelas" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {classes.map((c) => (
                                                <SelectItem key={c.id} value={c.id.toString()}>
                                                    {c.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.class_id && <p className="text-sm text-red-500">{errors.class_id}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Tahun Ajaran (Sesuai Penetapan)</Label>
                                    <Select
                                        value={data.academic_year}
                                        disabled
                                    >
                                        <SelectTrigger className="bg-muted">
                                            <SelectValue />
                                        </SelectTrigger>
                                    </Select>
                                    <p className="text-xs text-muted-foreground">Tahun ajaran aktif dari pengaturan rapot</p>
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
                    deleteUrl={route('api.admin.class-teacher-assignments.destroy', deleteDialog.item?.id || 0)}
                />
            </div>
        </AppLayout>
    );
}
