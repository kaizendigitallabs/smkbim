import AppLayout from '@/Layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { DeleteDialog } from '@/components/delete-dialog';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Pencil, Trash2, Plus, FileText, Download as DownloadIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Download {
    id: number;
    name: string;
    description?: string;
    category: string;
    file_path: string;
    file_url: string;
    created_at: string;
}

const categoryLabels: Record<string, string> = {
    brochure: 'Brosur',
    calendar: 'Kalender',
    guide: 'Panduan',
    other: 'Lainnya',
};

export default function Index({ downloads }: { downloads: Download[] }) {
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; download: Download | null }>({
        open: false,
        download: null,
    });

    const columns: ColumnDef<Download>[] = [
        {
            accessorKey: 'name',
            header: 'Nama File',
            cell: ({ row }) => (
                <div className="max-w-md">
                    <div className="font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        {row.original.name}
                    </div>
                    {row.original.description && (
                        <div className="text-sm text-muted-foreground mt-1">
                            {row.original.description}
                        </div>
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'category',
            header: 'Kategori',
            cell: ({ row }) => (
                <Badge variant="outline">
                    {categoryLabels[row.original.category] || row.original.category}
                </Badge>
            ),
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <a href={row.original.file_url} download target="_blank" rel="noopener noreferrer">
                            <DownloadIcon className="h-4 w-4" />
                        </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.downloads.edit', row.original.id)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteDialog({ open: true, download: row.original })}
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
                { title: 'Download', href: '#' },
            ]}
        >
            <Head title="Download Center" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Download Center</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola file download untuk publik
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route('admin.downloads.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Upload File
                        </Link>
                    </Button>
                </div>

                <DataTable columns={columns} data={downloads} searchColumn="name" />

                <DeleteDialog
                    open={deleteDialog.open}
                    onOpenChange={(open) => setDeleteDialog({ open, download: null })}
                    title="Hapus File"
                    description={`Apakah Anda yakin ingin menghapus "${deleteDialog.download?.name}"? File akan dihapus permanen.`}
                    deleteUrl={route('admin.downloads.destroy', deleteDialog.download?.id || 0)}
                />
            </div>
        </AppLayout>
    );
}
