import AppLayout from '@/Layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/components/image-upload';
import { Switch } from '@/components/ui/switch';
import { FormEventHandler } from 'react';
import { ArrowLeft } from 'lucide-react';

import { useRole } from '@/hooks/useRole';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Teacher {
    id: number;
    name: string;
    email: string; // user email
    position?: string;
    subject?: string;
    contact?: string;
    photo?: string;
    is_active: boolean;
    order: number;
    user?: {
        email: string;
    };
    nip?: string;
    nuptk?: string;
    gender?: string;
    place_of_birth?: string;
    date_of_birth?: string;
    address?: string;
    last_education?: string;
    education_major?: string;
    university?: string;
}

export default function Edit({ teacher }: { teacher: Teacher }) {
    const { hasRole } = useRole();
    const showFullForm = hasRole(['super_admin', 'tata_usaha', 'admin_sekolah']);

    const { data, setData, post, processing, errors } = useForm({
        name: teacher.name,
        email: teacher.user?.email || '',
        password: '',
        position: teacher.position || '',
        
        contact: teacher.contact || '',
        photo: null as File | null,
        is_active: teacher.is_active,
        order: teacher.order,
        
        nip: teacher.nip || '',
        nuptk: teacher.nuptk || '',
        gender: teacher.gender || 'L',
        place_of_birth: teacher.place_of_birth || '',
        date_of_birth: teacher.date_of_birth || '',
        address: teacher.address || '',
        last_education: teacher.last_education || '',
        education_major: teacher.education_major || '',
        university: teacher.university || '',

        _method: 'PUT',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.teachers.update', teacher.id), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Guru & Staff', href: route('admin.teachers.index') },
                { title: 'Edit Guru', href: '#' },
            ]}
        >
            <Head title={`Edit ${teacher.name}`} />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.teachers.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Guru</h1>
                        <p className="text-muted-foreground mt-2">
                            Edit data {teacher.name}
                        </p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Dasar</CardTitle>
                            <CardDescription>
                                Informasi akun dan identitas utama
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Lengkap *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Nama lengkap guru"
                                    />
                                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nip">NIP</Label>
                                    <Input
                                        id="nip"
                                        value={data.nip}
                                        onChange={(e) => setData('nip', e.target.value)}
                                        placeholder="Nomor Induk Pegawai"
                                    />
                                    {errors.nip && <p className="text-sm text-destructive">{errors.nip}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email (Username Login)</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="nama@sekolah.com"
                                    />
                                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Kosongkan jika tidak ingin mengubah"
                                    />
                                    {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {showFullForm && (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Data Kepegawaian & Pribadi</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="nuptk">NUPTK</Label>
                                            <Input
                                                id="nuptk"
                                                value={data.nuptk}
                                                onChange={(e) => setData('nuptk', e.target.value)}
                                                placeholder="NUPTK"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="position">Jabatan</Label>
                                            <Input
                                                id="position"
                                                value={data.position}
                                                onChange={(e) => setData('position', e.target.value)}
                                                placeholder="Guru, Kepala Sekolah, dll"
                                            />
                                            {errors.position && <p className="text-sm text-destructive">{errors.position}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="gender">Jenis Kelamin</Label>
                                            <Select value={data.gender} onValueChange={(val) => setData('gender', val)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="L">Laki-laki</SelectItem>
                                                    <SelectItem value="P">Perempuan</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="place_of_birth">Tempat Lahir</Label>
                                            <Input
                                                id="place_of_birth"
                                                value={data.place_of_birth}
                                                onChange={(e) => setData('place_of_birth', e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="date_of_birth">Tanggal Lahir</Label>
                                            <Input
                                                id="date_of_birth"
                                                type="date"
                                                value={data.date_of_birth}
                                                onChange={(e) => setData('date_of_birth', e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="contact">No. HP / Kontak</Label>
                                            <Input
                                                id="contact"
                                                value={data.contact}
                                                onChange={(e) => setData('contact', e.target.value)}
                                            />
                                            {errors.contact && <p className="text-sm text-destructive">{errors.contact}</p>}
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="address">Alamat</Label>
                                            <Textarea
                                                id="address"
                                                value={data.address}
                                                onChange={(e) => setData('address', e.target.value)}
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Pendidikan Terakhir</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="last_education">Pendidikan</Label>
                                            <Select value={data.last_education} onValueChange={(val) => setData('last_education', val)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih jenjang" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="SMA/SMK">SMA/SMK</SelectItem>
                                                    <SelectItem value="D3">D3</SelectItem>
                                                    <SelectItem value="S1">S1</SelectItem>
                                                    <SelectItem value="S2">S2</SelectItem>
                                                    <SelectItem value="S3">S3</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="education_major">Jurusan</Label>
                                            <Input
                                                id="education_major"
                                                value={data.education_major}
                                                onChange={(e) => setData('education_major', e.target.value)}
                                                placeholder="Contoh: Pendidikan Matematika"
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="university">Kampus / Universitas</Label>
                                            <Input
                                                id="university"
                                                value={data.university}
                                                onChange={(e) => setData('university', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Lainnya</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="order">Urutan Tampilan</Label>
                                        <Input
                                            id="order"
                                            type="number"
                                            value={data.order}
                                            onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                        />
                                        {errors.order && <p className="text-sm text-destructive">{errors.order}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <ImageUpload
                                            label="Foto Guru"
                                            value={teacher.photo}
                                            onChange={(file) => setData('photo', file)}
                                            error={errors.photo}
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData('is_active', checked)}
                                        />
                                        <Label htmlFor="is_active">Aktif</Label>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" asChild>
                            <Link href={route('admin.teachers.index')}>Batal</Link>
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
