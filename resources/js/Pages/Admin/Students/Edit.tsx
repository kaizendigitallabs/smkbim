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
import { useRole } from '@/hooks/useRole';

interface User {
    id: number;
    name: string;
    email: string;
}

interface SchoolClass {
    id: number;
    name: string;
}

interface Student {
    id: number;
    nis: string;
    nisn?: string;
    user: User;
    class_id?: number;
    place_of_birth?: string;
    date_of_birth?: string;
    gender: 'L' | 'P';
    address?: string;
    parent_phone?: string;
    religion?: string;
    father_name?: string;
    mother_name?: string;
    guardian_name?: string;
    father_job?: string;
    mother_job?: string;
    guardian_job?: string;
    previous_school?: string;
    entry_year?: string;
}

export default function Edit({ student, classes }: { student: Student; classes: SchoolClass[] }) {
    const { hasRole } = useRole();
    const showFullForm = hasRole(['super_admin', 'tata_usaha', 'admin_sekolah']);

    const { data, setData, put, processing, errors } = useForm({
        name: student.user.name,
        email: student.user.email,
        password: '',
        nis: student.nis,
        nisn: student.nisn || '',
        class_id: student.class_id?.toString() || '',
        place_of_birth: student.place_of_birth || '',
        date_of_birth: student.date_of_birth || '',
        gender: student.gender,
        address: student.address || '',
        parent_phone: student.parent_phone || '',
        religion: student.religion || '',
        father_name: student.father_name || '',
        mother_name: student.mother_name || '',
        guardian_name: student.guardian_name || '',
        father_job: student.father_job || '',
        mother_job: student.mother_job || '',
        guardian_job: student.guardian_job || '',
        previous_school: student.previous_school || '',
        entry_year: student.entry_year || '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.students.update', student.id));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/admin' },
                { title: 'Data Siswa', href: route('admin.students.index') },
                { title: 'Edit Siswa', href: '#' },
            ]}
        >
            <Head title="Edit Siswa" />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route('admin.students.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Siswa</h1>
                        <p className="text-muted-foreground mt-2">
                            Perbarui data siswa {student.user.name}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Akun</CardTitle>
                            <CardDescription>
                                Data untuk login siswa
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="name">Nama Lengkap *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Nama lengkap siswa"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="email@siswa.com"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-destructive">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password Baru</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Kosongkan jika tidak ingin mengubah"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Kosongkan jika tidak ingin mengubah password
                                    </p>
                                    {errors.password && (
                                        <p className="text-sm text-destructive">{errors.password}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Data Siswa</CardTitle>
                            <CardDescription>
                                Informasi lengkap siswa
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="nis">NIS *</Label>
                                    <Input
                                        id="nis"
                                        value={data.nis}
                                        onChange={(e) => setData('nis', e.target.value)}
                                        placeholder="Nomor Induk Siswa"
                                    />
                                    {errors.nis && (
                                        <p className="text-sm text-destructive">{errors.nis}</p>
                                    )}
                                </div>

                                {showFullForm && (
                                    <div className="space-y-2">
                                        <Label htmlFor="nisn">NISN</Label>
                                        <Input
                                            id="nisn"
                                            value={data.nisn}
                                            onChange={(e) => setData('nisn', e.target.value)}
                                            placeholder="Nomor Induk Siswa Nasional"
                                        />
                                        {errors.nisn && (
                                            <p className="text-sm text-destructive">{errors.nisn}</p>
                                        )}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="class_id">Kelas *</Label>
                                    <Select
                                        value={data.class_id}
                                        onValueChange={(value) => setData('class_id', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih kelas" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {classes.map((cls) => (
                                                <SelectItem key={cls.id} value={cls.id.toString()}>
                                                    {cls.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.class_id && (
                                        <p className="text-sm text-destructive">{errors.class_id}</p>
                                    )}
                                </div>

                                {showFullForm && (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="gender">Jenis Kelamin</Label>
                                            <Select
                                                value={data.gender}
                                                onValueChange={(value: 'L' | 'P') => setData('gender', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih jenis kelamin" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="L">Laki-laki</SelectItem>
                                                    <SelectItem value="P">Perempuan</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.gender && (
                                                <p className="text-sm text-destructive">{errors.gender}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="place_of_birth">Tempat Lahir</Label>
                                            <Input
                                                id="place_of_birth"
                                                value={data.place_of_birth}
                                                onChange={(e) => setData('place_of_birth', e.target.value)}
                                                placeholder="Kota kelahiran"
                                            />
                                            {errors.place_of_birth && (
                                                <p className="text-sm text-destructive">{errors.place_of_birth}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="date_of_birth">Tanggal Lahir</Label>
                                            <Input
                                                id="date_of_birth"
                                                type="date"
                                                value={data.date_of_birth}
                                                onChange={(e) => setData('date_of_birth', e.target.value)}
                                            />
                                            {errors.date_of_birth && (
                                                <p className="text-sm text-destructive">{errors.date_of_birth}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="religion">Agama</Label>
                                            <Select
                                                value={data.religion}
                                                onValueChange={(value) => setData('religion', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih agama" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Islam">Islam</SelectItem>
                                                    <SelectItem value="Kristen">Kristen</SelectItem>
                                                    <SelectItem value="Katolik">Katolik</SelectItem>
                                                    <SelectItem value="Hindu">Hindu</SelectItem>
                                                    <SelectItem value="Buddha">Buddha</SelectItem>
                                                    <SelectItem value="Konghucu">Konghucu</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.religion && (
                                                <p className="text-sm text-destructive">{errors.religion}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <h3 className="font-semibold text-sm">Data Orang Tua / Wali</h3>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="father_name">Nama Ayah</Label>
                                            <Input
                                                id="father_name"
                                                value={data.father_name}
                                                onChange={(e) => setData('father_name', e.target.value)}
                                                placeholder="Nama ayah kandung"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="father_job">Pekerjaan Ayah</Label>
                                            <Input
                                                id="father_job"
                                                value={data.father_job}
                                                onChange={(e) => setData('father_job', e.target.value)}
                                                placeholder="Pekerjaan ayah"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="mother_name">Nama Ibu</Label>
                                            <Input
                                                id="mother_name"
                                                value={data.mother_name}
                                                onChange={(e) => setData('mother_name', e.target.value)}
                                                placeholder="Nama ibu kandung"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="mother_job">Pekerjaan Ibu</Label>
                                            <Input
                                                id="mother_job"
                                                value={data.mother_job}
                                                onChange={(e) => setData('mother_job', e.target.value)}
                                                placeholder="Pekerjaan ibu"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="guardian_name">Nama Wali (Opsional)</Label>
                                            <Input
                                                id="guardian_name"
                                                value={data.guardian_name}
                                                onChange={(e) => setData('guardian_name', e.target.value)}
                                                placeholder="Nama wali siswa"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="guardian_job">Pekerjaan Wali (Opsional)</Label>
                                            <Input
                                                id="guardian_job"
                                                value={data.guardian_job}
                                                onChange={(e) => setData('guardian_job', e.target.value)}
                                                placeholder="Pekerjaan wali"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="parent_phone">No. HP Orang Tua</Label>
                                            <Input
                                                id="parent_phone"
                                                value={data.parent_phone}
                                                onChange={(e) => setData('parent_phone', e.target.value)}
                                                placeholder="08xxxxxxxxxx"
                                            />
                                            {errors.parent_phone && (
                                                <p className="text-sm text-destructive">{errors.parent_phone}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <h3 className="font-semibold text-sm">Data Asal Sekolah</h3>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="previous_school">Asal Sekolah</Label>
                                            <Input
                                                id="previous_school"
                                                value={data.previous_school}
                                                onChange={(e) => setData('previous_school', e.target.value)}
                                                placeholder="Nama sekolah asal"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="entry_year">Tahun Masuk</Label>
                                            <Input
                                                id="entry_year"
                                                value={data.entry_year}
                                                onChange={(e) => setData('entry_year', e.target.value)}
                                                placeholder="Tahun masuk (YYYY)"
                                                maxLength={4}
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="address">Alamat</Label>
                                            <Textarea
                                                id="address"
                                                value={data.address}
                                                onChange={(e) => setData('address', e.target.value)}
                                                placeholder="Alamat lengkap siswa"
                                                rows={3}
                                            />
                                            {errors.address && (
                                                <p className="text-sm text-destructive">{errors.address}</p>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" asChild>
                            <Link href={route('admin.students.index')}>Batal</Link>
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
