import AppLayout from '@/Layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Head, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { FormEventHandler } from 'react';
import { User, Mail, Shield, Key } from 'lucide-react';

export default function Account() {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    const { data, setData, put, processing, errors } = useForm({
        name: user?.name || '',
        email: user?.email || '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put('/account/profile');
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Account Settings', href: '/account' },
            ]}
        >
            <Head title="Account Settings" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your account settings and preferences
                    </p>
                </div>

                <Separator />

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Profile Information */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                <CardTitle>Profile Information</CardTitle>
                            </div>
                            <CardDescription>
                                Update your account's profile information and email address
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="flex-1"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-sm text-red-500">{errors.email}</p>
                                    )}
                                </div>

                                <Button type="submit" disabled={processing} className="w-full">
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Account Information */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-primary" />
                                <CardTitle>Account Information</CardTitle>
                            </div>
                            <CardDescription>
                                View your account details and role
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-muted-foreground">User ID</Label>
                                <p className="text-sm font-mono bg-muted p-2 rounded">
                                    {user?.id}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-muted-foreground">Email Address</Label>
                                <p className="text-sm font-medium">{user?.email}</p>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-muted-foreground">Roles</Label>
                                <div className="flex flex-wrap gap-2">
                                    {user?.roles && user.roles.length > 0 ? (
                                        user.roles.map((role, index) => (
                                            <span 
                                                key={index}
                                                className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary"
                                            >
                                                {role}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-sm text-muted-foreground">No roles assigned</span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-muted-foreground">Email Verified</Label>
                                <p className="text-sm font-medium">
                                    {user?.email_verified_at ? (
                                        <span className="text-green-600">✓ Verified</span>
                                    ) : (
                                        <span className="text-yellow-600">Not verified</span>
                                    )}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Change Password */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Key className="h-5 w-5 text-primary" />
                                <CardTitle>Change Password</CardTitle>
                            </div>
                            <CardDescription>
                                Ensure your account is using a long, random password to stay secure
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="current_password">Current Password</Label>
                                    <Input
                                        id="current_password"
                                        type="password"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="new_password">New Password</Label>
                                    <Input
                                        id="new_password"
                                        type="password"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirm_password">Confirm Password</Label>
                                    <Input
                                        id="confirm_password"
                                        type="password"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <Button variant="outline" className="w-full md:w-auto">
                                    Update Password
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
