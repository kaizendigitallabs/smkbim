import AppLayout from '@/Layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { DeleteDialog } from '@/components/delete-dialog';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface Activity {
    id: number;
    type: 'school' | 'extracurricular' | 'achievement';
    title: string;
    slug: string;
    date: string;
    description?: string;
    cover_image?: string;
}

const typeLabels = {
    school: 'Kegiatan Sekolah',
    extracurricular: 'Ekstrakurikuler',
    achievement: 'Prestasi',
};

export default function Index({ activities }: { activities: Activity[] }) {
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; activity?: Activity }>({
        open: false,
    });

    const columns: ColumnDef<Activity>[] = [
        {
            accessorKey: 'cover_image',
            header: 'Gambar',
            cell: ({ row }) => (
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    {row.original.cover_image ? (
                        <img
                            src={`/storage/${row.original.cover_image}`}
                            alt={row.original.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'title',
            header: 'Judul',
        },
        {
            accessorKey: 'type',
            header: 'Tipe',
            cell: ({ row }) => (
                <Badge variant="outline">{typeLabels[row.original.type]}</Badge>
            ),
        },
        {
            accessorKey: 'date',
            header: 'Tanggal',
            cell: ({ row }) => format(new Date(row.original.date), 'dd MMM yyyy', { locale: id }),
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.activities.edit', row.original.id)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteDialog({ open: true, activity: row.original })}
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
                { title: 'Kegiatan & Prestasi', href: '#' },
            ]}
        >
            <Head title="Kegiatan & Prestasi" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Kegiatan & Prestasi</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola kegiatan sekolah, ekstrakurikuler, dan prestasi siswa
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route('admin.activities.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Kegiatan
                        </Link>
                    </Button>
                </div>

                <DataTable
                    columns={columns}
                    data={activities}
                    searchColumn="title"
                    searchPlaceholder="Cari kegiatan..."
                />
            </div>

            <DeleteDialog
                open={deleteDialog.open}
                onOpenChange={(open) => setDeleteDialog({ open })}
                title="Hapus Kegiatan"
                description={`Apakah Anda yakin ingin menghapus ${deleteDialog.activity?.title}? Tindakan ini tidak dapat dibatalkan.`}
                deleteUrl={route('admin.activities.destroy', deleteDialog.activity?.id || 0)}
            />
        </AppLayout>
    );
}
