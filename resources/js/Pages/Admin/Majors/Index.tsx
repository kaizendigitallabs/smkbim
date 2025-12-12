import AppLayout from '@/Layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { DeleteDialog } from '@/components/delete-dialog';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Image as ImageIcon } from 'lucide-react';

interface Major {
    id: number;
    name: string;
    slug: string;
    description: string;
    image?: string;
}

export default function Index({ majors }: { majors: Major[] }) {
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; major?: Major }>({
        open: false,
    });

    const columns: ColumnDef<Major>[] = [
        {
            accessorKey: 'image',
            header: 'Gambar',
            cell: ({ row }) => (
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    {row.original.image ? (
                        <img
                            src={`/storage/${row.original.image}`}
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
            header: 'Nama Jurusan',
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.name}</div>
                    <div className="text-sm text-muted-foreground">{row.original.slug}</div>
                </div>
            ),
        },
        {
            accessorKey: 'description',
            header: 'Deskripsi',
            cell: ({ row }) => (
                <div className="max-w-md truncate">{row.original.description}</div>
            ),
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.majors.edit', row.original.id)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteDialog({ open: true, major: row.original })}
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
                { title: 'Jurusan', href: '#' },
            ]}
        >
            <Head title="Jurusan" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Jurusan</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola data jurusan yang tersedia
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route('admin.majors.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Jurusan
                        </Link>
                    </Button>
                </div>

                <DataTable
                    columns={columns}
                    data={majors}
                    searchColumn="name"
                    searchPlaceholder="Cari jurusan..."
                />
            </div>

            <DeleteDialog
                open={deleteDialog.open}
                onOpenChange={(open) => setDeleteDialog({ open })}
                title="Hapus Jurusan"
                description={`Apakah Anda yakin ingin menghapus jurusan ${deleteDialog.major?.name}? Tindakan ini tidak dapat dibatalkan.`}
                deleteUrl={route('admin.majors.destroy', deleteDialog.major?.id || 0)}
            />
        </AppLayout>
    );
}
