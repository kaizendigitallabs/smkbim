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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { DeleteDialog } from '@/components/delete-dialog';

interface Subject {
    id: number;
    name: string;
    code: string;
    description: string;
    subject_group?: 'A' | 'B' | 'C';
    display_order?: number;
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
        subject_group: 'A',
        display_order: 0,
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
            subject_group: item.subject_group || 'A',
            display_order: item.display_order || 0,
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
            accessorKey: 'subject_group',
            header: 'Kelompok',
            cell: ({ row }) => (
                <div className="text-center">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        row.original.subject_group === 'A' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
                        row.original.subject_group === 'B' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                        'bg-purple-50 text-purple-700 ring-purple-600/20'
                    }`}>
                        {row.original.subject_group || '-'}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: 'display_order',
            header: 'Urutan',
            cell: ({ row }) => <div className="text-center">{row.original.display_order || 0}</div>,
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
                        <DialogContent className="sm:max-w-2xl">
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
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="subject_group">Kelompok Mapel</Label>
                                        <Select
                                            value={data.subject_group}
                                            onValueChange={(value) => setData('subject_group', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Kelompok" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="A">A. Muatan Nasional</SelectItem>
                                                <SelectItem value="B">B. Muatan Kewilayahan</SelectItem>
                                                <SelectItem value="C">C. Muatan Peminatan Kejuruan</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.subject_group && <p className="text-sm text-red-500">{errors.subject_group}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="display_order">Urutan Rapot</Label>
                                        <Input
                                            id="display_order"
                                            type="number"
                                            value={data.display_order}
                                            onChange={(e) => setData('display_order', parseInt(e.target.value) || 0)}
                                            placeholder="0"
                                        />
                                        {errors.display_order && <p className="text-sm text-red-500">{errors.display_order}</p>}
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
