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

interface Major {
    id: number;
    name: string;
}

interface MajorProgram {
    id?: number;
    major_id: number;
    title: string;
    description: string;
    order: number;
}

export default function Form({ program, majors }: { program?: MajorProgram; majors: Major[] }) {
    const isEdit = !!program;
    
    const { data, setData, post, put, processing, errors } = useForm({
        major_id: program?.major_id || (majors[0]?.id || 0),
        title: program?.title || '',
        description: program?.description || '',
        order: program?.order || 0,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.major-programs.update', program.id));
        } else {
            post(route('admin.major-programs.store'));
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Program Keahlian', href: route('admin.major-programs.index') },
                { title: isEdit ? 'Edit Program' : 'Tambah Program', href: '#' },
            ]}
        >
            <Head title={isEdit ? `Edit Program Keahlian` : 'Tambah Program Keahlian'} />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.major-programs.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEdit ? 'Edit Program Keahlian' : 'Tambah Program Keahlian'}
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            {isEdit ? `Edit data program keahlian` : 'Tambahkan program keahlian baru'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Program</CardTitle>
                            <CardDescription>
                                Masukkan data program keahlian
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="major_id">Jurusan *</Label>
                                <Select
                                    value={data.major_id.toString()}
                                    onValueChange={(value) => setData('major_id', parseInt(value))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih jurusan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {majors.map((major) => (
                                            <SelectItem key={major.id} value={major.id.toString()}>
                                                {major.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.major_id && (
                                    <p className="text-sm text-destructive">{errors.major_id}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">Nama Program *</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Rekayasa Perangkat Lunak"
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
                                    placeholder="Deskripsi program keahlian..."
                                    rows={5}
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>

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
                            <Link href={route('admin.major-programs.index')}>Batal</Link>
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
