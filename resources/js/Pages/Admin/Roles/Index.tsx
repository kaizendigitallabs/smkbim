import AppLayout from '@/Layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2, Plus, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useEffect } from 'react';
import { DeleteDialog } from '@/components/delete-dialog';

interface Permission {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
    created_at: string;
}

export default function Index({ roles, permissions }: { roles: Role[], permissions: Permission[] }) {
    const [open, setOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    
    // Group permissions for better UI
    const groupedPermissions = permissions.reduce((acc, permission) => {
        const parts = permission.name.split('_');
        const group = parts.length > 1 ? parts[1].toUpperCase() : 'OTHER';
        if (!acc[group]) acc[group] = [];
        acc[group].push(permission);
        return acc;
    }, {} as Record<string, Permission[]>);

    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; role: Role | null }>({
        open: false,
        role: null,
    });

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        permissions: [] as string[],
    });

    useEffect(() => {
        if (!open) {
            reset();
            clearErrors();
            setEditingRole(null);
            setSelectedPermissions([]);
        }
    }, [open]);

    useEffect(() => {
        if (editingRole) {
            setData({
                name: editingRole.name,
                permissions: editingRole.permissions.map(p => p.name),
            });
            setSelectedPermissions(editingRole.permissions.map(p => p.name));
        }
    }, [editingRole]);

    const handlePermissionChange = (permissionName: string, checked: boolean) => {
        let newPermissions = [...selectedPermissions];
        if (checked) {
            newPermissions.push(permissionName);
        } else {
            newPermissions = newPermissions.filter(p => p !== permissionName);
        }
        setSelectedPermissions(newPermissions);
        setData('permissions', newPermissions);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Manual sync
        data.permissions = selectedPermissions;

        if (editingRole) {
            put(route('admin.roles.update', editingRole.id), {
                onSuccess: () => setOpen(false),
            });
        } else {
            post(route('admin.roles.store'), {
                onSuccess: () => setOpen(false),
            });
        }
    };

    const handleEdit = (role: Role) => {
        setEditingRole(role);
        setOpen(true);
    };

    const columns: ColumnDef<Role>[] = [
        {
            accessorKey: 'name',
            header: 'Role Name',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium capitalize">{row.original.name.replace('_', ' ')}</span>
                </div>
            ),
        },
        {
            accessorKey: 'permissions',
            header: 'Permissions',
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-1">
                    {row.original.permissions.length > 0 ? (
                        <Badge variant="outline" className="text-xs">
                            {row.original.permissions.length} Permissions
                        </Badge>
                    ) : (
                        <span className="text-muted-foreground text-xs italic">No permissions</span>
                    )}
                </div>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const isSuperAdmin = row.original.name === 'super_admin';
                return (
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" disabled={isSuperAdmin} onClick={() => handleEdit(row.original)}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" disabled={isSuperAdmin} onClick={() => setDeleteDialog({ open: true, role: row.original })}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'User Management', href: '#' },
                { title: 'Roles', href: '#' },
            ]}
        >
            <Head title="Roles Management" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Roles</h1>
                        <p className="text-muted-foreground mt-2">
                            Manage user roles and their permissions
                        </p>
                    </div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Role
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{editingRole ? 'Edit Role' : 'Create New Role'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Role Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="e.g. library_manager"
                                        required
                                        className="max-w-md"
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-base font-semibold">Permissions</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
                                        {Object.entries(groupedPermissions).map(([group, groupPermissions]) => (
                                            <div key={group} className="space-y-3 border rounded-lg p-4 bg-gray-50 dark:bg-zinc-900/50">
                                                <h4 className="font-bold text-sm text-primary flex items-center gap-2 border-b pb-2 mb-2">
                                                    <Shield className="h-3 w-3" />
                                                    {group}
                                                </h4>
                                                <div className="space-y-2">
                                                    {groupPermissions.map((permission) => (
                                                        <div key={permission.id} className="flex items-start space-x-2">
                                                            <Checkbox 
                                                                id={`perm-${permission.id}`}
                                                                checked={selectedPermissions.includes(permission.name)}
                                                                onCheckedChange={(checked: boolean) => handlePermissionChange(permission.name, checked)}
                                                                className="mt-0.5"
                                                            />
                                                            <Label htmlFor={`perm-${permission.id}`} className="text-sm font-normal cursor-pointer leading-tight break-words capitalize">
                                                                {permission.name.replace(/_/g, ' ')}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.permissions && <p className="text-sm text-red-500">{errors.permissions}</p>}
                                </div>

                                <DialogFooter>
                                    <Button type="submit" disabled={processing} className="bg-emerald-600 hover:bg-emerald-700 w-full md:w-auto">
                                        {editingRole ? 'Update Role' : 'Create Role'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <DataTable columns={columns} data={roles} searchColumn="name" />
                
                <DeleteDialog
                    open={deleteDialog.open}
                    onOpenChange={(open) => setDeleteDialog({ open, role: null })}
                    title="Delete Role"
                    description={`Are you sure you want to delete role "${deleteDialog.role?.name}"? This action cannot be undone.`}
                    deleteUrl={route('admin.roles.destroy', deleteDialog.role?.id || 0)}
                />
            </div>
        </AppLayout>
    );
}
