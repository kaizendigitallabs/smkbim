import AppLayout from '@/Layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/image-upload';
import { FormEventHandler } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Major {
    id: number;
    name: string;
    description: string;
    image?: string;
    profile_content?: string;
    curriculum_content?: string;
    facilities_content?: string;
}

export default function Edit({ major }: { major: Major }) {
    const { data, setData, post, processing, errors } = useForm({
        name: major.name,
        description: major.description,
        image: null as File | null,
        profile_content: major.profile_content || '',
        curriculum_content: major.curriculum_content || '',
        facilities_content: major.facilities_content || '',
        _method: 'PUT',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.majors.update', major.id), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Jurusan', href: route('admin.majors.index') },
                { title: 'Edit Jurusan', href: '#' },
            ]}
        >
            <Head title={`Edit ${major.name}`} />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.majors.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Jurusan</h1>
                        <p className="text-muted-foreground mt-2">
                            Edit data {major.name}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Jurusan</CardTitle>
                            <CardDescription>
                                Perbarui data jurusan
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Jurusan *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Teknik Komputer dan Jaringan"
                                />
                                {errors.name && (
                                    <p className="text-sm text-destructive">{errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi *</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Deskripsi singkat tentang jurusan..."
                                    rows={3}
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <ImageUpload
                                    label="Gambar Jurusan"
                                    value={major.image}
                                    onChange={(file) => setData('image', file)}
                                    error={errors.image}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="profile_content">Profil Jurusan</Label>
                                <Textarea
                                    id="profile_content"
                                    value={data.profile_content}
                                    onChange={(e) => setData('profile_content', e.target.value)}
                                    placeholder="Profil lengkap jurusan..."
                                    rows={5}
                                />
                                {errors.profile_content && (
                                    <p className="text-sm text-destructive">{errors.profile_content}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="curriculum_content">Kurikulum</Label>
                                <Textarea
                                    id="curriculum_content"
                                    value={data.curriculum_content}
                                    onChange={(e) => setData('curriculum_content', e.target.value)}
                                    placeholder="Informasi kurikulum jurusan..."
                                    rows={5}
                                />
                                {errors.curriculum_content && (
                                    <p className="text-sm text-destructive">{errors.curriculum_content}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="facilities_content">Fasilitas</Label>
                                <Textarea
                                    id="facilities_content"
                                    value={data.facilities_content}
                                    onChange={(e) => setData('facilities_content', e.target.value)}
                                    placeholder="Fasilitas yang tersedia..."
                                    rows={5}
                                />
                                {errors.facilities_content && (
                                    <p className="text-sm text-destructive">{errors.facilities_content}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" asChild>
                            <Link href={route('admin.majors.index')}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
