import AppLayout from '@/Layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { DeleteDialog } from '@/components/delete-dialog';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MajorProgram {
    id: number;
    major_id: number;
    title: string;
    description: string;
    order: number;
    major: {
        id: number;
        name: string;
    };
}

export default function Index({ programs }: { programs: MajorProgram[] }) {
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; program?: MajorProgram }>({
        open: false,
    });

    const columns: ColumnDef<MajorProgram>[] = [
        {
            accessorKey: 'major.name',
            header: 'Jurusan',
            cell: ({ row }) => (
                <Badge variant="outline">{row.original.major.name}</Badge>
            ),
        },
        {
            accessorKey: 'title',
            header: 'Program Keahlian',
        },
        {
            accessorKey: 'description',
            header: 'Deskripsi',
            cell: ({ row }) => (
                <div className="max-w-md truncate">{row.original.description}</div>
            ),
        },
        {
            accessorKey: 'order',
            header: 'Urutan',
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.major-programs.edit', row.original.id)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteDialog({ open: true, program: row.original })}
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
                { title: 'Program Keahlian', href: '#' },
            ]}
        >
            <Head title="Program Keahlian" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Program Keahlian</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola program keahlian untuk setiap jurusan
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route('admin.major-programs.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Program
                        </Link>
                    </Button>
                </div>

                <DataTable
                    columns={columns}
                    data={programs}
                    searchColumn="title"
                    searchPlaceholder="Cari program..."
                />
            </div>

            <DeleteDialog
                open={deleteDialog.open}
                onOpenChange={(open) => setDeleteDialog({ open })}
                title="Hapus Program Keahlian"
                description={`Apakah Anda yakin ingin menghapus program ${deleteDialog.program?.title}? Tindakan ini tidak dapat dibatalkan.`}
                deleteUrl={route('admin.major-programs.destroy', deleteDialog.program?.id || 0)}
            />
        </AppLayout>
    );
}
