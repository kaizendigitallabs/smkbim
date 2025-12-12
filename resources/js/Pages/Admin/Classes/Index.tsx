import AppLayout from '@/Layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2, Plus, School } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { DeleteDialog } from '@/components/delete-dialog';

interface SchoolClass {
    id: number;
    name: string;
    level: string;
    academic_year: string;
    homeroom_teacher?: {
        id: number;
        name: string;
    };
}

export default function Index({ classes }: { classes: SchoolClass[] }) {
    const [open, setOpen] = useState(false);
    const [editingClass, setEditingClass] = useState<SchoolClass | null>(null);
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; item: SchoolClass | null }>({
        open: false,
        item: null,
    });

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        level: '',
        academic_year: '2024/2025',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingClass) {
            put(route('api.admin.classes.update', editingClass.id), {
                onSuccess: () => {
                    setOpen(false);
                    reset();
                    setEditingClass(null);
                },
            });
        } else {
            post(route('api.admin.classes.store'), {
                onSuccess: () => {
                    setOpen(false);
                    reset();
                },
            });
        }
    };

    const handleEdit = (item: SchoolClass) => {
        setEditingClass(item);
        setData({
            name: item.name,
            level: item.level,
            academic_year: item.academic_year,
            description: '',
        });
        setOpen(true);
    };

    const columns: ColumnDef<SchoolClass>[] = [
        {
            accessorKey: 'name',
            header: 'Nama Kelas',
            cell: ({ row }) => (
                <div className="font-medium">{row.original.name}</div>
            ),
        },
        {
            accessorKey: 'level',
            header: 'Tingkat',
            cell: ({ row }) => (
                <Badge variant="outline">{row.original.level}</Badge>
            ),
        },
        {
            accessorKey: 'academic_year',
            header: 'Tahun Ajaran',
        },
        {
            accessorKey: 'homeroom_teacher',
            header: 'Wali Kelas',
            cell: ({ row }) => (
                row.original.homeroom_teacher ? row.original.homeroom_teacher.name : <span className="text-muted-foreground italic">Belum assign</span>
            ),
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(row.original)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
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
                { title: 'Master Data', href: '#' },
                { title: 'Data Kelas', href: '#' },
            ]}
        >
            <Head title="Data Kelas" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Data Kelas</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola data kelas dan rombongan belajar
                        </p>
                    </div>
                    <Dialog open={open} onOpenChange={(val) => {
                        setOpen(val);
                        if (!val) {
                            setEditingClass(null);
                            reset();
                        }
                    }}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Kelas
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editingClass ? 'Edit Kelas' : 'Tambah Kelas Baru'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Kelas</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Contoh: X RPL 1"
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="level">Tingkat</Label>
                                        <Input
                                            id="level"
                                            value={data.level}
                                            onChange={(e) => setData('level', e.target.value)}
                                            placeholder="X / XI / XII"
                                        />
                                        {errors.level && <p className="text-sm text-red-500">{errors.level}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="academic_year">Tahun Ajaran</Label>
                                        <Input
                                            id="academic_year"
                                            value={data.academic_year}
                                            onChange={(e) => setData('academic_year', e.target.value)}
                                        />
                                        {errors.academic_year && <p className="text-sm text-red-500">{errors.academic_year}</p>}
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button type="submit" disabled={processing}>
                                        {editingClass ? 'Simpan Perubahan' : 'Buat Kelas'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <DataTable columns={columns} data={classes} searchColumn="name" />

                <DeleteDialog
                    open={deleteDialog.open}
                    onOpenChange={(open) => setDeleteDialog({ open, item: null })}
                    title="Hapus Kelas"
                    description={`Apakah Anda yakin ingin menghapus kelas "${deleteDialog.item?.name}"?`}
                    deleteUrl={route('api.admin.classes.destroy', deleteDialog.item?.id || 0)}
                />
            </div>
        </AppLayout>
    );
}
