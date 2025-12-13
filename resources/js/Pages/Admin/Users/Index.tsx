import AppLayout from '@/Layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Shield, Plus, Pencil, Trash2, UserPlus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useEffect } from 'react';
import { DeleteDialog } from '@/components/delete-dialog';

interface User {
    id: number;
    name: string;
    email: string;
    roles: Role[];
}

interface Role {
    id: number;
    name: string;
}

export default function UsersIndex({ users, roles }: { users: { data: User[], links: any }, roles: Role[] }) {
    // State for Create/Edit Dialog
    const [open, setOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    
    // State for Delete Dialog
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; user: User | null }>({
        open: false,
        user: null,
    });

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [] as string[],
    });

    useEffect(() => {
        if (!open) {
            reset();
            clearErrors();
            setEditingUser(null);
            setSelectedRoles([]);
        }
    }, [open]);

    // Update form data when editing
    useEffect(() => {
        if (editingUser) {
            setData({
                name: editingUser.name,
                email: editingUser.email,
                password: '',
                password_confirmation: '',
                roles: editingUser.roles.map(r => r.name),
            });
            setSelectedRoles(editingUser.roles.map(r => r.name));
        }
    }, [editingUser]);

    // Handle Roles Checkbox Change
    const handleRoleChange = (roleName: string, checked: boolean) => {
        let newRoles = [...selectedRoles];
        if (checked) {
            newRoles.push(roleName);
        } else {
            newRoles = newRoles.filter(r => r !== roleName);
        }
        setSelectedRoles(newRoles);
        setData('roles', newRoles);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Manual sync of roles state to form data just in case
        data.roles = selectedRoles;

        if (editingUser) {
            put(route('admin.users.update', editingUser.id), {
                onSuccess: () => setOpen(false),
            });
        } else {
            post(route('admin.users.store'), {
                onSuccess: () => setOpen(false),
            });
        }
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setOpen(true);
    };

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'name',
            header: 'Nama User',
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.name}</div>
                    <div className="text-xs text-muted-foreground">{row.original.email}</div>
                </div>
            ),
        },
        {
            accessorKey: 'roles',
            header: 'Roles',
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-1">
                    {row.original.roles.map(role => (
                        <Badge key={role.id} variant="secondary" className="text-xs capitalize">
                            {role.name.replace('_', ' ')}
                        </Badge>
                    ))}
                </div>
            ),
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(row.original)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setDeleteDialog({ open: true, user: row.original })}
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
                { title: 'User Management', href: '#' },
                { title: 'Users & Roles', href: '#' },
            ]}
        >
            <Head title="Manage Users" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Users & Roles</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola pengguna dan hak akses role mereka
                        </p>
                    </div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Tambah User
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                            <DialogHeader>
                                <DialogTitle>{editingUser ? 'Edit User' : 'Tambah User Baru'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Lengkap</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Nama User"
                                        required
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="email@example.com"
                                        required
                                    />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder={editingUser ? "(Biarkan kosong jika tetap)" : "Password"}
                                            required={!editingUser}
                                        />
                                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder={editingUser ? "" : "Ulangi Password"}
                                            required={!editingUser}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3 border rounded-md p-4">
                                    <Label>Assign Roles</Label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {roles.map((role) => (
                                            <div key={role.id} className="flex items-center space-x-2">
                                                <Checkbox 
                                                    id={`role-${role.id}`}
                                                    checked={selectedRoles.includes(role.name)}
                                                    onCheckedChange={(checked: boolean) => handleRoleChange(role.name, checked)}
                                                />
                                                <Label htmlFor={`role-${role.id}`} className="capitalize cursor-pointer">
                                                    {role.name.replace('_', ' ')}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.roles && <p className="text-sm text-red-500">{errors.roles}</p>}
                                </div>

                                <DialogFooter>
                                    <Button type="submit" disabled={processing}>
                                        {editingUser ? 'Simpan Perubahan' : 'Buat User'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <DataTable columns={columns} data={users.data} searchColumn="name" />

                <DeleteDialog
                    open={deleteDialog.open}
                    onOpenChange={(open) => setDeleteDialog({ open, user: null })}
                    title="Hapus User"
                    description={`Apakah Anda yakin ingin menghapus user "${deleteDialog.user?.name}"? Tindakan ini tidak dapat dibatalkan.`}
                    deleteUrl={route('admin.users.destroy', deleteDialog.user?.id || 0)}
                />
            </div>
        </AppLayout>
    );
}
