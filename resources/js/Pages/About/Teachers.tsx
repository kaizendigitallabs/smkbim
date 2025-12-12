import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function Teachers({ teachers }: { teachers: any[] }) {
    return (
        <PublicLayout>
            <Head title="Guru & Staff" />
             <div className="container mx-auto px-4 py-12">
                <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Guru & Staff</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {teachers?.length > 0 ? teachers.map((teacher) => (
                        <div key={teacher.id} className="border rounded-lg p-4 text-center">
                            {/* Avatar placeholder */}
                            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4" /> 
                            <h3 className="font-bold">{teacher.name}</h3>
                            <p className="text-sm text-gray-500">{teacher.position}</p>
                        </div>
                    )) : <p>Belum ada data guru.</p>}
                </div>
                </div>
            </div>
        </PublicLayout>
    );
}
