import AppLayout from '@/Layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { DeleteDialog } from '@/components/delete-dialog';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Download, Upload, FileDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface User {
    id: number;
    name: string;
    email: string;
}

interface SchoolClass {
    id: number;
    name: string;
}

interface Student {
    id: number;
    nis: string;
    nisn?: string;
    user: User;
    school_class?: SchoolClass;
    place_of_birth?: string;
    date_of_birth?: string;
    gender: 'L' | 'P';
    address?: string;
    parent_phone?: string;
}

interface PaginatedStudents {
    data: Student[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export default function Index({ students }: { students: PaginatedStudents }) {
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; student?: Student }>({
        open: false,
    });
    const [importDialog, setImportDialog] = useState(false);
    const [importFile, setImportFile] = useState<File | null>(null);

    const handleImport = () => {
        if (!importFile) return;

        const formData = new FormData();
        formData.append('file', importFile);

        router.post(route('admin.students.import'), formData, {
            onSuccess: () => {
                setImportDialog(false);
                setImportFile(null);
            },
        });
    };

    const handleExport = () => {
        window.location.href = route('admin.students.export');
    };

    const handleDownloadTemplate = () => {
        window.location.href = route('admin.students.template');
    };

    const columns: ColumnDef<Student>[] = [
        {
            accessorKey: 'nis',
            header: 'NIS',
        },
        {
            accessorKey: 'user.name',
            header: 'Nama',
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.user.name}</div>
                    <div className="text-sm text-muted-foreground">{row.original.user.email}</div>
                </div>
            ),
        },
        {
            accessorKey: 'school_class.name',
            header: 'Kelas',
            cell: ({ row }) => (
                <span>
                    {row.original.school_class?.name || (
                        <span className="text-muted-foreground">Belum ada kelas</span>
                    )}
                </span>
            ),
        },
        {
            accessorKey: 'gender',
            header: 'Jenis Kelamin',
            cell: ({ row }) => (
                <Badge variant="outline">{row.original.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</Badge>
            ),
        },
        {
            accessorKey: 'parent_phone',
            header: 'No. HP Orang Tua',
            cell: ({ row }) => (
                <span>{row.original.parent_phone || '-'}</span>
            ),
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.students.edit', row.original.id)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteDialog({ open: true, student: row.original })}
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
                { title: 'Dashboard', href: '/admin' },
                { title: 'Data Siswa', href: '#' },
            ]}
        >
            <Head title="Data Siswa" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Data Siswa</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola data siswa sekolah
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <Download className="mr-2 h-4 w-4" />
                                    Import/Export
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setImportDialog(true)}>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Import Excel
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleExport}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Export Excel
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleDownloadTemplate}>
                                    <FileDown className="mr-2 h-4 w-4" />
                                    Download Template
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button asChild>
                            <Link href={route('admin.students.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Siswa
                            </Link>
                        </Button>
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    data={students.data}
                    searchColumn="user.name"
                    searchPlaceholder="Cari siswa..."
                />
            </div>

            <DeleteDialog
                open={deleteDialog.open}
                onOpenChange={(open) => setDeleteDialog({ open })}
                title="Hapus Siswa"
                description={`Apakah Anda yakin ingin menghapus ${deleteDialog.student?.user.name}? Tindakan ini tidak dapat dibatalkan.`}
                deleteUrl={route('admin.students.destroy', deleteDialog.student?.id || 0)}
            />

            <Dialog open={importDialog} onOpenChange={setImportDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Import Data Siswa</DialogTitle>
                        <DialogDescription>
                            Upload file Excel untuk mengimport data siswa. Pastikan format sesuai dengan template.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="file">File Excel</Label>
                            <Input
                                id="file"
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setImportDialog(false)}>
                                Batal
                            </Button>
                            <Button onClick={handleImport} disabled={!importFile}>
                                Import
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
