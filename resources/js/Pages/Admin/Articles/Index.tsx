import AppLayout from '@/Layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { DeleteDialog } from '@/components/delete-dialog';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface Article {
    id: number;
    category: string;
    title: string;
    slug: string;
    status: string;
    cover_image?: string;
    published_at?: string;
    created_at: string;
}

export default function Index({ articles }: { articles: Article[] }) {
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; article: Article | null }>({
        open: false,
        article: null,
    });

    const columns: ColumnDef<Article>[] = [
        {
            accessorKey: 'title',
            header: 'Judul',
            cell: ({ row }) => (
                <div className="max-w-md">
                    <div className="font-medium">{row.original.title}</div>
                    <div className="text-sm text-muted-foreground truncate">{row.original.slug}</div>
                </div>
            ),
        },
        {
            accessorKey: 'category',
            header: 'Kategori',
            cell: ({ row }) => (
                <Badge variant="outline">
                    {row.original.category}
                </Badge>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <Badge variant={row.original.status === 'published' ? 'default' : 'secondary'}>
                    {row.original.status === 'published' ? 'Published' : 'Draft'}
                </Badge>
            ),
        },
        {
            accessorKey: 'published_at',
            header: 'Tanggal Publish',
            cell: ({ row }) => (
                <div className="text-sm">
                    {row.original.published_at 
                        ? format(new Date(row.original.published_at), 'dd MMM yyyy')
                        : '-'
                    }
                </div>
            ),
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.articles.edit', row.original.id)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteDialog({ open: true, article: row.original })}
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
                { title: 'Artikel & Berita', href: '#' },
            ]}
        >
            <Head title="Artikel & Berita" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Artikel & Berita</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola artikel dan berita sekolah
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route('admin.articles.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Artikel
                        </Link>
                    </Button>
                </div>

                <DataTable columns={columns} data={articles} searchColumn="title" />

                <DeleteDialog
                    open={deleteDialog.open}
                    onOpenChange={(open) => setDeleteDialog({ open, article: null })}
                    title="Hapus Artikel"
                    description={`Apakah Anda yakin ingin menghapus artikel "${deleteDialog.article?.title}"? Tindakan ini tidak dapat dibatalkan.`}
                    deleteUrl={route('admin.articles.destroy', deleteDialog.article?.id || 0)}
                />
            </div>
        </AppLayout>
    );
}
