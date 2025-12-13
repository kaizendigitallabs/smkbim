import AppLayout from '@/Layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Plus, Shield, Users, BookOpen, GraduationCap, Globe, Settings, FileText, LayoutGrid } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { DeleteDialog } from '@/components/delete-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
}

export default function PermissionsIndex({ permissions }: { permissions: Permission[] }) {
    const [open, setOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Permission | null>(null);
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; item: Permission | null }>({
        open: false,
        item: null,
    });

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
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
            });
        }
    }, [editingItem]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingItem) {
            put(route('admin.permissions.update', editingItem.id), {
                onSuccess: () => setOpen(false),
            });
        } else {
            post(route('admin.permissions.store'), {
                onSuccess: () => setOpen(false),
            });
        }
    };

    const handleEdit = (item: Permission) => {
        setEditingItem(item);
        setOpen(true);
    };

    // Grouping Logic
    const groups = [
        { 
            name: 'User Management', 
            keywords: ['user', 'role', 'permission'], 
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        { 
            name: 'Academic Data', 
            keywords: ['class', 'subject', 'student', 'assignment', 'grade', 'academic'], 
            icon: GraduationCap,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50'
        },
        { 
            name: 'Content Management', 
            keywords: ['article', 'gallery', 'download', 'activity', 'testimonial', 'project', 'program'], 
            icon: Globe,
            color: 'text-purple-600',
            bg: 'bg-purple-50'
        },
        { 
            name: 'PPDB System', 
            keywords: ['ppdb'], 
            icon: BookOpen,
            color: 'text-orange-600',
            bg: 'bg-orange-50'
        },
        { 
            name: 'School Profile', 
            keywords: ['school', 'teacher', 'major'], 
            icon: Settings,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50'
        },
    ];

    const groupedPermissions = groups.map(group => {
        const groupPermissions = permissions.filter(p => 
            group.keywords.some(k => p.name.toLowerCase().includes(k))
        );
        return { ...group, permissions: groupPermissions };
    });

    // Find permissions that didn't match any group
    const matchedIds = new Set(groupedPermissions.flatMap(g => g.permissions.map(p => p.id)));
    const otherPermissions = permissions.filter(p => !matchedIds.has(p.id));

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'User Management', href: '#' },
                { title: 'Permissions', href: '#' },
            ]}
        >
            <Head title="Permissions" />

            <div className="space-y-6 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Permissions</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola hak akses sistem berdasarkan modul
                        </p>
                    </div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-[#21AD00] hover:bg-[#1a8a00]">
                                <Plus className="mr-2 h-4 w-4" />
                                Buat Permission
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editingItem ? 'Edit Permission' : 'Buat Permission Baru'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Permission Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="e.g. manage_users"
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Gunakan format: <code>verb_noun</code> (contoh: <code>create_posts</code>)
                                    </p>
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={processing} className="bg-[#21AD00] hover:bg-[#1a8a00]">
                                        {editingItem ? 'Simpan Perubahan' : 'Buat Permission'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {groupedPermissions.map((group) => (
                        group.permissions.length > 0 && (
                            <Card key={group.name} className="shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className={`flex flex-row items-center space-y-0 pb-2 ${group.bg} rounded-t-lg border-b`}>
                                    <div className={`p-2 rounded-full bg-white/50mr-3 ${group.color}`}>
                                        <group.icon className="h-5 w-5 mr-2" />
                                    </div>
                                    <CardTitle className="text-base font-semibold">{group.name}</CardTitle>
                                    <Badge variant="secondary" className="ml-auto bg-white/50">
                                        {group.permissions.length}
                                    </Badge>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <div className="space-y-3">
                                        {group.permissions.map(permission => (
                                            <div key={permission.id} className="flex items-center justify-between group p-2 rounded-md hover:bg-gray-50 border border-transparent hover:border-gray-100">
                                                <div className="flex items-center gap-2 overflow-hidden">
                                                    <Shield className="h-3 w-3 text-gray-400 shrink-0" />
                                                    <span className="text-sm font-medium truncate" title={permission.name}>
                                                        {permission.name}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleEdit(permission)}>
                                                        <Pencil className="h-3 w-3 text-blue-500" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setDeleteDialog({ open: true, item: permission })}>
                                                        <Trash2 className="h-3 w-3 text-red-500" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    ))}

                    {/* Other Permissions */}
                    {otherPermissions.length > 0 && (
                        <Card className="shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center space-y-0 pb-2 bg-gray-50 rounded-t-lg border-b">
                                <FileText className="h-5 w-5 text-gray-600 mr-2" />
                                <CardTitle className="text-base font-semibold">Lainnya</CardTitle>
                                <Badge variant="secondary" className="ml-auto bg-white/50">
                                    {otherPermissions.length}
                                </Badge>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="space-y-3">
                                    {otherPermissions.map(permission => (
                                        <div key={permission.id} className="flex items-center justify-between group p-2 rounded-md hover:bg-gray-50 border border-transparent hover:border-gray-100">
                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <Shield className="h-3 w-3 text-gray-400 shrink-0" />
                                                <span className="text-sm font-medium truncate" title={permission.name}>
                                                    {permission.name}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleEdit(permission)}>
                                                    <Pencil className="h-3 w-3 text-blue-500" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setDeleteDialog({ open: true, item: permission })}>
                                                    <Trash2 className="h-3 w-3 text-red-500" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <DeleteDialog
                    open={deleteDialog.open}
                    onOpenChange={(open) => setDeleteDialog({ open, item: null })}
                    title="Hapus Permission"
                    description={`Apakah Anda yakin ingin menghapus permission "${deleteDialog.item?.name}"? Tindakan ini tidak dapat dibatalkan.`}
                    deleteUrl={route('admin.permissions.destroy', deleteDialog.item?.id || 0)}
                />
            </div>
        </AppLayout>
    );
}
