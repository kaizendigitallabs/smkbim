import AppLayout from '@/Layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { IconPicker } from '@/components/icon-picker';
import { FormEventHandler } from 'react';
import { ArrowLeft } from 'lucide-react';

interface SchoolProgram {
    id?: number;
    title: string;
    description: string;
    icon?: string;
    order: number;
}

export default function Form({ program }: { program?: SchoolProgram }) {
    const isEdit = !!program;
    
    const { data, setData, post, put, processing, errors } = useForm({
        title: program?.title || '',
        description: program?.description || '',
        icon: program?.icon || '',
        order: program?.order || 0,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.school-programs.update', program.id));
        } else {
            post(route('admin.school-programs.store'));
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Program Unggulan', href: route('admin.school-programs.index') },
                { title: isEdit ? 'Edit Program' : 'Tambah Program', href: '#' },
            ]}
        >
            <Head title={isEdit ? `Edit ${program.title}` : 'Tambah Program Unggulan'} />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.school-programs.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEdit ? 'Edit Program Unggulan' : 'Tambah Program Unggulan'}
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            {isEdit ? `Edit data ${program.title}` : 'Tambahkan program unggulan baru'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Program</CardTitle>
                            <CardDescription>
                                Masukkan data program unggulan
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Judul Program *</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Pembelajaran Berbasis Proyek"
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi *</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Deskripsi program unggulan..."
                                    rows={5}
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>

                            <IconPicker
                                label="Icon (opsional)"
                                value={data.icon}
                                onChange={(icon) => setData('icon', icon)}
                                error={errors.icon}
                            />

                            <div className="space-y-2">
                                <Label htmlFor="order">Urutan Tampilan</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={data.order}
                                    onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                    placeholder="0"
                                />
                                {errors.order && (
                                    <p className="text-sm text-destructive">{errors.order}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" asChild>
                            <Link href={route('admin.school-programs.index')}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
