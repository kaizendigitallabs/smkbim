import AppLayout from '@/Layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, Pencil, Trash2, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from 'react';
import { DeleteDialog } from '@/components/delete-dialog';
import Swal from 'sweetalert2';

interface AcademicYear {
    id: number;
    name: string;
    semester: 'Ganjil' | 'Genap';
    is_active: boolean;
    start_date: string | null;
    end_date: string | null;
}

export default function AcademicYearsIndex({ academicYears }: { academicYears: AcademicYear[] }) {
    const [open, setOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<AcademicYear | null>(null);
    
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; item: AcademicYear | null }>({
        open: false,
        item: null,
    });

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        semester: 'Ganjil',
        is_active: false,
        start_date: '',
        end_date: '',
    });

    useEffect(() => {
        if (!open) {
            reset();
            clearErrors();
            setEditingItem(null);
        }
    }, [open]);

    useEffect(() => {
        if (editingItem) {
            setData({
                name: editingItem.name,
                semester: editingItem.semester,
                is_active: editingItem.is_active,
                start_date: editingItem.start_date || '',
                end_date: editingItem.end_date || '',
            });
        }
    }, [editingItem]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingItem) {
            put(route('admin.academic-years.update', editingItem.id), {
                onSuccess: () => setOpen(false),
            });
        } else {
            post(route('admin.academic-years.store'), {
                onSuccess: () => setOpen(false),
            });
        }
    };

    const handleEdit = (item: AcademicYear) => {
        setEditingItem(item);
        setOpen(true);
    };

    const handleSetActive = (item: AcademicYear) => {
        if (item.is_active) return; // Already active

        Swal.fire({
            title: 'Aktifkan Tahun Ajaran?',
            text: `Anda akan mengaktifkan tahun ajaran ${item.name} Semester ${item.semester}. Tahun ajaran lain akan dinonaktifkan.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#21AD00',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Aktifkan!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route('admin.academic-years.set-active', item.id));
            }
        });
    };

    const columns: ColumnDef<AcademicYear>[] = [
        {
            accessorKey: 'name',
            header: 'Tahun Ajaran',
            cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
        },
        {
            accessorKey: 'semester',
            header: 'Semester',
            cell: ({ row }) => (
                <Badge variant="outline" className={row.original.semester === 'Ganjil' ? 'border-orange-500 text-orange-500 bg-orange-50' : 'border-blue-500 text-blue-500 bg-blue-50'}>
                    {row.original.semester}
                </Badge>
            ),
        },
        {
            accessorKey: 'is_active',
            header: 'Status',
            cell: ({ row }) => (
                row.original.is_active ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" /> Aktif
                    </Badge>
                ) : (
                    <Badge variant="secondary" className="text-gray-500">
                        Tidak Aktif
                    </Badge>
                )
            ),
        },
        {
            header: 'Periode',
            cell: ({ row }) => (
                <div className="text-sm text-gray-600">
                    {row.original.start_date && row.original.end_date ? (
                        <>
                            {new Date(row.original.start_date).toLocaleDateString('id-ID')} - {new Date(row.original.end_date).toLocaleDateString('id-ID')}
                        </>
                    ) : (
                        '-'
                    )}
                </div>
            ),
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    {!row.original.is_active && (
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200"
                            onClick={() => handleSetActive(row.original)}
                            title="Set Aktif"
                        >
                            <CheckCircle className="h-4 w-4" />
                        </Button>
                    )}
                    
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(row.original)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    
                    {!row.original.is_active && (
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => setDeleteDialog({ open: true, item: row.original })}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Master Data', href: '#' },
                { title: 'Tahun Ajaran', href: '#' },
            ]}
        >
            <Head title="Tahun Ajaran" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Tahun Ajaran</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola tahun ajaran dan semester aktif
                        </p>
                    </div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-[#21AD00] hover:bg-[#1a8a00]">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Tahun Ajaran
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                            <DialogHeader>
                                <DialogTitle>{editingItem ? 'Edit Tahun Ajaran' : 'Tambah Tahun Ajaran'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Tahun Ajaran</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Contoh: 2024/2025"
                                        required
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="semester">Semester</Label>
                                    <Select 
                                        value={data.semester} 
                                        onValueChange={(val: 'Ganjil'|'Genap') => setData('semester', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Semester" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Ganjil">Ganjil</SelectItem>
                                            <SelectItem value="Genap">Genap</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.semester && <p className="text-sm text-red-500">{errors.semester}</p>}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="start_date">Tanggal Mulai</Label>
                                        <Input
                                            id="start_date"
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) => setData('start_date', e.target.value)}
                                        />
                                        {errors.start_date && <p className="text-sm text-red-500">{errors.start_date}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="end_date">Tanggal Selesai</Label>
                                        <Input
                                            id="end_date"
                                            type="date"
                                            value={data.end_date}
                                            onChange={(e) => setData('end_date', e.target.value)}
                                        />
                                        {errors.end_date && <p className="text-sm text-red-500">{errors.end_date}</p>}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 border p-3 rounded-md bg-gray-50">
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked)}
                                    />
                                    <div className="space-y-0.5">
                                        <Label htmlFor="is_active">Aktifkan Sekarang?</Label>
                                        <p className="text-xs text-muted-foreground">
                                            Jika diaktifkan, tahun ajaran lain akan otomatis dinonaktifkan.
                                        </p>
                                    </div>
                                </div>

                                <DialogFooter>
                                    <Button type="submit" disabled={processing} className="bg-[#21AD00] hover:bg-[#1a8a00]">
                                        {editingItem ? 'Simpan Perubahan' : 'Buat Tahun Ajaran'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <DataTable columns={columns} data={academicYears} searchColumn="name" />

                <DeleteDialog
                    open={deleteDialog.open}
                    onOpenChange={(open) => setDeleteDialog({ open, item: null })}
                    title="Hapus Tahun Ajaran"
                    description={`Apakah Anda yakin ingin menghapus tahun ajaran "${deleteDialog.item?.name} - ${deleteDialog.item?.semester}"?`}
                    deleteUrl={route('admin.academic-years.destroy', deleteDialog.item?.id || 0)}
                />
            </div>
        </AppLayout>
    );
}
