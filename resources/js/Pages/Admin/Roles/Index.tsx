import AppLayout from '@/Layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2, Plus, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Role {
    id: number;
    name: string;
    permissions: { id: number; name: string }[];
    created_at: string;
}

export default function Index({ roles }: { roles: Role[] }) {
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
                        <>
                            <Badge variant="outline" className="text-xs">
                                {row.original.permissions.length} Permissions
                            </Badge>
                        </>
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
                        <Button variant="ghost" size="icon" disabled={isSuperAdmin} asChild>
                            <Link href="#">
                                <Pencil className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" disabled={isSuperAdmin}>
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
                    <Button asChild>
                        <Link href="#">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Role
                        </Link>
                    </Button>
                </div>

                <DataTable columns={columns} data={roles} searchColumn="name" />
            </div>
        </AppLayout>
    );
}
