import AppLayout from '@/Layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { DeleteDialog } from '@/components/delete-dialog';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Teacher {
    id: number;
    name: string;
    position?: string;
    subject?: string;
    contact?: string;
    photo?: string;
    is_active: boolean;
    order: number;
}

export default function Index({ teachers }: { teachers: Teacher[] }) {
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; teacher?: Teacher }>({
        open: false,
    });

    const columns: ColumnDef<Teacher>[] = [
        {
            accessorKey: 'photo',
            header: 'Foto',
            cell: ({ row }) => (
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    {row.original.photo ? (
                        <img
                            src={`/storage/${row.original.photo}`}
                            alt={row.original.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'name',
            header: 'Nama',
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.name}</div>
                    {row.original.position && (
                        <div className="text-sm text-muted-foreground">{row.original.position}</div>
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'subject',
            header: 'Mata Pelajaran',
        },
        {
            accessorKey: 'contact',
            header: 'Kontak',
        },
        {
            accessorKey: 'is_active',
            header: 'Status',
            cell: ({ row }) => (
                <Badge variant={row.original.is_active ? 'default' : 'secondary'}>
                    {row.original.is_active ? 'Aktif' : 'Tidak Aktif'}
                </Badge>
            ),
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.teachers.edit', row.original.id)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteDialog({ open: true, teacher: row.original })}
                    >
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Guru & Staff', href: '#' },
            ]}
        >
            <Head title="Guru & Staff" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Guru & Staff</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola data guru dan tenaga pendidik
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route('admin.teachers.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Guru
                        </Link>
                    </Button>
                </div>

                <DataTable
                    columns={columns}
                    data={teachers}
                    searchColumn="name"
                    searchPlaceholder="Cari guru..."
                />
            </div>

            <DeleteDialog
                open={deleteDialog.open}
                onOpenChange={(open) => setDeleteDialog({ open })}
                title="Hapus Guru"
                description={`Apakah Anda yakin ingin menghapus ${deleteDialog.teacher?.name}? Tindakan ini tidak dapat dibatalkan.`}
                deleteUrl={route('admin.teachers.destroy', deleteDialog.teacher?.id || 0)}
            />
        </AppLayout>
    );
}
