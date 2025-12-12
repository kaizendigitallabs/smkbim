import AppLayout from '@/Layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Shield, Plus, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

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
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [open, setOpen] = useState(false);
    
    // Local state for selected roles in dialog
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setSelectedRoles(user.roles.map(r => r.name));
        setOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingUser) return;

        router.post(route('api.admin.users.roles.store', editingUser.id), {
            roles: selectedRoles
        }, {
            onSuccess: () => {
                setOpen(false);
                setEditingUser(null);
            }
        });
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
                <Button variant="outline" size="sm" onClick={() => handleEdit(row.original)}>
                    <Shield className="mr-2 h-3 w-3" />
                    Manage Roles
                </Button>
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
            <Head title="Manage Users Roles" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Users & Roles</h1>
                        <p className="text-muted-foreground mt-2">
                            Kelola role untuk setiap pengguna (Super Admin Only)
                        </p>
                    </div>
                </div>

                <DataTable columns={columns} data={users.data} searchColumn="name" />

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Manage Roles for {editingUser?.name}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-4">
                                <Label>Select Roles</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    {roles.map((role) => {
                                        const isChecked = selectedRoles.includes(role.name);
                                        return (
                                            <div key={role.id} className="flex items-center space-x-2 border p-3 rounded-md">
                                                <Checkbox 
                                                    id={`role-${role.id}`} 
                                                    checked={isChecked}
                                                    onCheckedChange={(checked: boolean) => {
                                                        if (checked) {
                                                            setSelectedRoles([...selectedRoles, role.name]);
                                                        } else {
                                                            setSelectedRoles(selectedRoles.filter(r => r !== role.name));
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor={`role-${role.id}`} className="capitalize cursor-pointer flex-1">
                                                    {role.name.replace('_', ' ')}
                                                </Label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button type="submit">
                                    Update Roles
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
