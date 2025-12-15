import React from 'react';
import AppLayout from '@/Layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';

const breadcrumbs = [
    {
        title: 'Absensi Guru',
        href: '/teacher/attendance-teacher',
    },
];

export default function AttendanceUnderConstruction() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Absensi Guru - Under Construction" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-12 flex flex-col items-center justify-center text-center">
                            <div className="bg-yellow-100 p-6 rounded-full mb-6">
                                <Construction className="h-24 w-24 text-yellow-600" />
                            </div>
                            
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Fitur Sedang Dalam Pengembangan
                            </h3>
                            
                            <p className="text-gray-600 max-w-md mb-8">
                                Mohon maaf, fitur Absensi Guru saat ini masih dalam tahap pengembangan. 
                                Silakan kembali lagi nanti untuk melihat pembaruan.
                            </p>
                            
                            <Button asChild>
                                <Link href="/dashboard">
                                    Kembali ke Dashboard
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
