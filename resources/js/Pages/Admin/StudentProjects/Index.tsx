import AppLayout from '@/Layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { DeleteDialog } from '@/components/delete-dialog';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface StudentProject {
    id: number;
    major_id: number;
    student_name: string;
    title: string;
    description?: string;
    image?: string;
    major: {
        id: number;
        name: string;
    };
}

export default function Index({ projects }: { projects: StudentProject[] }) {
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; project?: StudentProject }>({
        open: false,
    });

    const columns: ColumnDef<StudentProject>[] = [
        {
            accessorKey: 'image',
            header: 'Gambar',
            cell: ({ row }) => (
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    {row.original.image ? (
                        <img
                            src={`/storage/${row.original.image}`}
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
            header: 'Judul Project',
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.title}</div>
                    <div className="text-sm text-muted-foreground">{row.original.student_name}</div>
                </div>
            ),
        },
        {
            accessorKey: 'major.name',
            header: 'Jurusan',
            cell: ({ row }) => (
                <Badge variant="outline">{row.original.major.name}</Badge>
            ),
        },
        {
            accessorKey: 'description',
            header: 'Deskripsi',
            cell: ({ row }) => (
                <div className="max-w-md truncate">{row.original.description || '-'}</div>
            ),
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.student-projects.edit', row.original.id)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteDialog({ open: true, project: row.original })}
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
                { title: 'Project Siswa', href: '#' },
            ]}
        >
            <Head title="Project Siswa" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Project Siswa</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola portofolio dan project siswa
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route('admin.student-projects.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Project
                        </Link>
                    </Button>
                </div>

                <DataTable
                    columns={columns}
                    data={projects}
                    searchColumn="title"
                    searchPlaceholder="Cari project..."
                />
            </div>

            <DeleteDialog
                open={deleteDialog.open}
                onOpenChange={(open) => setDeleteDialog({ open })}
                title="Hapus Project"
                description={`Apakah Anda yakin ingin menghapus project ${deleteDialog.project?.title}? Tindakan ini tidak dapat dibatalkan.`}
                deleteUrl={route('admin.student-projects.destroy', deleteDialog.project?.id || 0)}
            />
        </AppLayout>
    );
}
