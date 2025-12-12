import AppLayout from '@/Layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormEventHandler } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Download {
    id?: number;
    name: string;
    description?: string;
    category: string;
    file_path?: string;
}

const categories = [
    { value: 'brochure', label: 'Brosur' },
    { value: 'calendar', label: 'Kalender' },
    { value: 'guide', label: 'Panduan' },
    { value: 'other', label: 'Lainnya' },
];

export default function Form({ download }: { download?: Download }) {
    const isEdit = !!download;
    
    const { data, setData, post, processing, errors } = useForm({
        name: download?.name || '',
        description: download?.description || '',
        category: download?.category || 'other',
        file: null as File | null,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEdit) {
            post(route('admin.downloads.update', download.id), {
                forceFormData: true,
            });
        } else {
            post(route('admin.downloads.store'), {
                forceFormData: true,
            });
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Download', href: route('admin.downloads.index') },
                { title: isEdit ? 'Edit File' : 'Upload File', href: '#' },
            ]}
        >
            <Head title={isEdit ? 'Edit File' : 'Upload File'} />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.downloads.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEdit ? 'Edit File' : 'Upload File'}
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            {isEdit ? 'Edit informasi file' : 'Upload file baru untuk download'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi File</CardTitle>
                            <CardDescription>
                                Masukkan informasi file download
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama File *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Contoh: Brosur SMK BIM 2024"
                                />
                                {errors.name && (
                                    <p className="text-sm text-destructive">{errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Deskripsi singkat tentang file..."
                                    rows={3}
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Kategori *</Label>
                                <Select
                                    value={data.category}
                                    onValueChange={(value) => setData('category', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.value} value={cat.value}>
                                                {cat.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.category && (
                                    <p className="text-sm text-destructive">{errors.category}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="file">
                                    File {isEdit ? '(kosongkan jika tidak ingin mengubah)' : '*'}
                                </Label>
                                <Input
                                    id="file"
                                    type="file"
                                    onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Format: PDF, DOC, XLS, PPT, ZIP, RAR. Maksimal 10MB
                                </p>
                                {download?.file_path && (
                                    <p className="text-sm text-muted-foreground">
                                        File saat ini: {download.file_path.split('/').pop()}
                                    </p>
                                )}
                                {errors.file && (
                                    <p className="text-sm text-destructive">{errors.file}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" asChild>
                            <Link href={route('admin.downloads.index')}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Upload'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
