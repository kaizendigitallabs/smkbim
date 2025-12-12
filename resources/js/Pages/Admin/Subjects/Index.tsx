import AppLayout from '@/Layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { DeleteDialog } from '@/components/delete-dialog';

interface Subject {
    id: number;
    name: string;
    code: string;
    description: string;
}

export default function Index({ subjects }: { subjects: Subject[] }) {
    const [open, setOpen] = useState(false);
    const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; item: Subject | null }>({
        open: false,
        item: null,
    });

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        code: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingSubject) {
            put(route('api.admin.subjects.update', editingSubject.id), {
                onSuccess: () => {
                    setOpen(false);
                    reset();
                    setEditingSubject(null);
                },
            });
        } else {
            post(route('api.admin.subjects.store'), {
                onSuccess: () => {
                    setOpen(false);
                    reset();
                },
            });
        }
    };

    const handleEdit = (item: Subject) => {
        setEditingSubject(item);
        setData({
            name: item.name,
            code: item.code,
            description: item.description || '',
        });
        setOpen(true);
    };

    const columns: ColumnDef<Subject>[] = [
        {
            accessorKey: 'code',
            header: 'Kode',
            cell: ({ row }) => <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded">{row.original.code}</span>,
        },
        {
            accessorKey: 'name',
            header: 'Nama Mata Pelajaran',
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.name}</div>
                    <div className="text-xs text-muted-foreground">{row.original.description}</div>
                </div>
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
                { title: 'Data Mapel', href: '#' },
            ]}
        >
            <Head title="Data Mata Pelajaran" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Data Mata Pelajaran</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola data mata pelajaran
                        </p>
                    </div>
                    <Dialog open={open} onOpenChange={(val) => {
                        setOpen(val);
                        if (!val) {
                            setEditingSubject(null);
                            reset();
                        }
                    }}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Mapel
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editingSubject ? 'Edit Mapel' : 'Tambah Mapel Baru'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="col-span-1 space-y-2">
                                        <Label htmlFor="code">Kode</Label>
                                        <Input
                                            id="code"
                                            value={data.code}
                                            onChange={(e) => setData('code', e.target.value)}
                                            placeholder="MTK"
                                        />
                                        {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
                                    </div>
                                    <div className="col-span-3 space-y-2">
                                        <Label htmlFor="name">Nama Mapel</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Matematika"
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Deskripsi</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button type="submit" disabled={processing}>
                                        {editingSubject ? 'Simpan Perubahan' : 'Buat Mapel'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <DataTable columns={columns} data={subjects} searchColumn="name" />

                <DeleteDialog
                    open={deleteDialog.open}
                    onOpenChange={(open) => setDeleteDialog({ open, item: null })}
                    title="Hapus Mapel"
                    description={`Apakah Anda yakin ingin menghapus mapel "${deleteDialog.item?.name}"?`}
                    deleteUrl={route('api.admin.subjects.destroy', deleteDialog.item?.id || 0)}
                />
            </div>
        </AppLayout>
    );
}
