import AppLayout from '@/Layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/image-upload';
import { FormEventHandler } from 'react';
import { Building2, MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';

interface SchoolProfile {
    id: number;
    name: string;
    description?: string;
    vision?: string;
    mission?: string;
    history?: string;
    address?: string;
    phone?: string;
    email?: string;
    whatsapp?: string;
    logo?: string;
    maps_embed_link?: string;
    operating_hours?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
}

export default function Index({ profile }: { profile?: SchoolProfile }) {
    const { data, setData, put, processing, errors } = useForm({
        name: profile?.name || '',
        description: profile?.description || '',
        vision: profile?.vision || '',
        mission: profile?.mission || '',
        history: profile?.history || '',
        address: profile?.address || '',
        phone: profile?.phone || '',
        email: profile?.email || '',
        whatsapp: profile?.whatsapp || '',
        logo: null as File | null,
        maps_embed_link: profile?.maps_embed_link || '',
        operating_hours: profile?.operating_hours || '',
        facebook: profile?.facebook || '',
        instagram: profile?.instagram || '',
        youtube: profile?.youtube || '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (profile?.id) {
            put(route('admin.school-profile.update', profile.id), {
                forceFormData: true,
            });
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Profil Sekolah', href: '#' },
            ]}
        >
            <Head title="Profil Sekolah" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Profil Sekolah</h1>
                    <p className="text-muted-foreground mt-2">
                        Kelola informasi profil sekolah Anda
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-primary" />
                                <CardTitle>Informasi Dasar</CardTitle>
                            </div>
                            <CardDescription>
                                Informasi umum tentang sekolah
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="name">Nama Sekolah *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="SMK Bina Insan Mulia"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description">Deskripsi</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Deskripsi singkat tentang sekolah..."
                                        rows={3}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-destructive">{errors.description}</p>
                                    )}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <ImageUpload
                                        label="Logo Sekolah"
                                        value={profile?.logo}
                                        onChange={(file) => setData('logo', file)}
                                        error={errors.logo}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Vision & Mission */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Visi & Misi</CardTitle>
                            <CardDescription>
                                Visi dan misi sekolah
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="vision">Visi</Label>
                                <Textarea
                                    id="vision"
                                    value={data.vision}
                                    onChange={(e) => setData('vision', e.target.value)}
                                    placeholder="Visi sekolah..."
                                    rows={3}
                                />
                                {errors.vision && (
                                    <p className="text-sm text-destructive">{errors.vision}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="mission">Misi</Label>
                                <Textarea
                                    id="mission"
                                    value={data.mission}
                                    onChange={(e) => setData('mission', e.target.value)}
                                    placeholder="Misi sekolah..."
                                    rows={5}
                                />
                                {errors.mission && (
                                    <p className="text-sm text-destructive">{errors.mission}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="history">Sejarah</Label>
                                <Textarea
                                    id="history"
                                    value={data.history}
                                    onChange={(e) => setData('history', e.target.value)}
                                    placeholder="Sejarah singkat sekolah..."
                                    rows={5}
                                />
                                {errors.history && (
                                    <p className="text-sm text-destructive">{errors.history}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Phone className="h-5 w-5 text-primary" />
                                <CardTitle>Informasi Kontak</CardTitle>
                            </div>
                            <CardDescription>
                                Informasi kontak sekolah
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Telepon</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="(021) 1234567"
                                    />
                                    {errors.phone && (
                                        <p className="text-sm text-destructive">{errors.phone}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="whatsapp">WhatsApp</Label>
                                    <Input
                                        id="whatsapp"
                                        value={data.whatsapp}
                                        onChange={(e) => setData('whatsapp', e.target.value)}
                                        placeholder="08123456789"
                                    />
                                    {errors.whatsapp && (
                                        <p className="text-sm text-destructive">{errors.whatsapp}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="info@smkbim.sch.id"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-destructive">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="operating_hours">Jam Operasional</Label>
                                    <Input
                                        id="operating_hours"
                                        value={data.operating_hours}
                                        onChange={(e) => setData('operating_hours', e.target.value)}
                                        placeholder="Senin - Jumat, 07:00 - 16:00"
                                    />
                                    {errors.operating_hours && (
                                        <p className="text-sm text-destructive">{errors.operating_hours}</p>
                                    )}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="address">Alamat</Label>
                                    <Textarea
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        placeholder="Alamat lengkap sekolah..."
                                        rows={3}
                                    />
                                    {errors.address && (
                                        <p className="text-sm text-destructive">{errors.address}</p>
                                    )}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="maps_embed_link">Google Maps Embed Link</Label>
                                    <Input
                                        id="maps_embed_link"
                                        value={data.maps_embed_link}
                                        onChange={(e) => setData('maps_embed_link', e.target.value)}
                                        placeholder="https://www.google.com/maps/embed?..."
                                    />
                                    {errors.maps_embed_link && (
                                        <p className="text-sm text-destructive">{errors.maps_embed_link}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Social Media */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Globe className="h-5 w-5 text-primary" />
                                <CardTitle>Media Sosial</CardTitle>
                            </div>
                            <CardDescription>
                                Link media sosial sekolah
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="facebook">Facebook</Label>
                                    <Input
                                        id="facebook"
                                        value={data.facebook}
                                        onChange={(e) => setData('facebook', e.target.value)}
                                        placeholder="https://facebook.com/..."
                                    />
                                    {errors.facebook && (
                                        <p className="text-sm text-destructive">{errors.facebook}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="instagram">Instagram</Label>
                                    <Input
                                        id="instagram"
                                        value={data.instagram}
                                        onChange={(e) => setData('instagram', e.target.value)}
                                        placeholder="https://instagram.com/..."
                                    />
                                    {errors.instagram && (
                                        <p className="text-sm text-destructive">{errors.instagram}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="youtube">YouTube</Label>
                                    <Input
                                        id="youtube"
                                        value={data.youtube}
                                        onChange={(e) => setData('youtube', e.target.value)}
                                        placeholder="https://youtube.com/..."
                                    />
                                    {errors.youtube && (
                                        <p className="text-sm text-destructive">{errors.youtube}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <Button type="submit" disabled={processing} size="lg">
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
