import AppLayout from '@/Layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch'; // Assuming shadcn switch
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        role: '',
        content: '',
        rating: 5,
        is_active: true,
        avatar: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.testimonials.store'), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Testimoni', href: '/admin/testimonials' },
                { title: 'Tambah', href: '#' },
            ]}
        >
            <Head title="Tambah Testimoni" />
            <div className="flex justify-between items-center mb-6 px-4 pt-4">
                <div className="flex items-center gap-2">
                    <Link href={route('admin.testimonials.index')}>
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">Tambah Testimoni</h1>
                </div>
            </div>

            <div className="px-4 max-w-2xl">
                <Card>
                    <CardContent className="pt-6 space-y-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Lengkap</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Contoh: Budi Santoso"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role">Peran</Label>
                                <Input
                                    id="role"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    placeholder="Contoh: Alumni 2023 / Orang Tua Siswa"
                                />
                                {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Isi Testimoni</Label>
                                <Textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder="Tuliskan pengalaman atau kesan..."
                                    rows={4}
                                />
                                {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <StarRating
                                    label="Rating"
                                    value={data.rating}
                                    onChange={(rating) => setData('rating', rating)}
                                    error={errors.rating}
                                />
                                
                                <div className="space-y-2 flex flex-col justify-center">
                                    <Label className="mb-2">Status Aktif</Label>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData('is_active', checked)}
                                        />
                                        <span>{data.is_active ? 'Tampilkan' : 'Sembunyikan'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="avatar">Foto Profil (Optional)</Label>
                                <Input
                                    id="avatar"
                                    type="file"
                                    onChange={(e) => setData('avatar', e.target.files ? e.target.files[0] : null)}
                                    accept="image/*"
                                />
                                {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar}</p>}
                            </div>

                            <div className="pt-4">
                                <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                                    <Save className="mr-2 h-4 w-4" />
                                    Simpan Testimoni
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
