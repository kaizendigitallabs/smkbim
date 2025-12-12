import AppLayout from '@/Layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { DeleteDialog } from '@/components/delete-dialog';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Image as ImageIcon, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Gallery {
    id: number;
    type: 'photo' | 'video';
    title: string;
    url: string;
    thumbnail?: string;
    category?: string;
    activity?: {
        id: number;
        title: string;
    };
    created_at: string;
}

export default function Index({ galleries }: { galleries: Gallery[] }) {
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; gallery: Gallery | null }>({
        open: false,
        gallery: null,
    });

    const columns: ColumnDef<Gallery[]> = [
        {
            accessorKey: 'type',
            header: 'Tipe',
            cell: ({ row }) => (
                <Badge variant={row.original.type === 'photo' ? 'default' : 'secondary'}>
                    {row.original.type === 'photo' ? (
                        <><ImageIcon className="h-3 w-3 mr-1" /> Foto</>
                    ) : (
                        <><Video className="h-3 w-3 mr-1" /> Video</>
                    )}
                </Badge>
            ),
        },
        {
            accessorKey: 'title',
            header: 'Judul',
            cell: ({ row }) => (
                <div className="max-w-md">
                    <div className="font-medium">{row.original.title}</div>
                    {row.original.category && (
                        <div className="text-sm text-muted-foreground">{row.original.category}</div>
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'activity',
            header: 'Kegiatan',
            cell: ({ row }) => (
                <div className="text-sm">
                    {row.original.activity?.title || '-'}
                </div>
            ),
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.gallery.edit', row.original.id)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteDialog({ open: true, gallery: row.original })}
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
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Galeri', href: '#' },
            ]}
        >
            <Head title="Galeri" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Galeri</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola foto dan video galeri
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route('admin.gallery.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Item
                        </Link>
                    </Button>
                </div>

                <DataTable columns={columns} data={galleries} searchColumn="title" />

                <DeleteDialog
                    open={deleteDialog.open}
                    onOpenChange={(open) => setDeleteDialog({ open, gallery: null })}
                    title="Hapus Item Galeri"
                    description={`Apakah Anda yakin ingin menghapus "${deleteDialog.gallery?.title}"? Tindakan ini tidak dapat dibatalkan.`}
                    deleteUrl={route('admin.gallery.destroy', deleteDialog.gallery?.id || 0)}
                />
            </div>
        </AppLayout>
    );
}
