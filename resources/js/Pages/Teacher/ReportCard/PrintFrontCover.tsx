import { Head } from '@inertiajs/react';
import React from 'react';

interface Props {
    student: any;
    settings: any;
    schoolProfile: any;
}

export default function PrintFrontCover({ student, settings, schoolProfile }: Props) {
    return (
        <div className="bg-white text-black font-sans min-h-screen p-8 print:p-0 flex flex-col items-center justify-between text-center relative overflow-hidden">
            <Head title={`Cover Rapot - ${student.user.name}`} />

            <style>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 1cm;
                    }
                    body {
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                    .no-print {
                        display: none;
                    }
                    .page-container {
                        height: auto;
                        min-height: 27cm; 
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: center;
                    }
                }
                .page-container {
                    min-height: 90vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1cm 0;
                }
            `}</style>

            <div className="no-print absolute top-4 right-4">
                <button 
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
                >
                    Cetak Cover
                </button>
            </div>

            <div className="page-container w-full max-w-[21cm]">
                
                {/* Header Section */}
                <div className="flex flex-col items-center gap-4 mt-4 text-center">
                    <h1 className="text-xl font-bold font-serif tracking-wide mt-2 uppercase">
                        RAPOR<br/>
                        PESERTA DIDIK<br/>
                        SEKOLAH MENENGAH KEJURUAN<br/>
                        (SMK)
                    </h1>
                </div>

                {/* Center Section: Student Name */}
                <div className="flex flex-col items-center gap-2 my-8">
                     {/* School Logo above name */}
                     {settings.logo_watermark ? (
                        <div className="mb-6">
                            <img 
                                src={`/storage/${settings.logo_watermark}`} 
                                alt="Logo Sekolah" 
                                className="h-32 w-32 object-contain"
                            />
                        </div>
                     ) : (
                        // Fallback/Placeholder if no logo uploaded? 
                        // User specifically asked for uploaded logo. If none, maybe show nothing or Tut Wuri as fallback?
                        // I will leave it empty if null to respect "uploaded logo" request.
                        <div className="h-32 w-32 flex items-center justify-center border border-dashed border-gray-300 mb-6 text-gray-400 text-sm p-2 text-center">
                            Logo belum diupload di Pengaturan Rapot
                        </div>
                     )}

                    <p className="mb-2 text-lg">Nama Peserta Didik:</p>
                    <div className="border border-black px-6 py-3 min-w-[300px] bg-white text-lg font-bold uppercase tracking-wider shadow-sm">
                        {student.user.name}
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2 mb-4">
                    <p className="mb-2 text-lg">NIS / NISN:</p>
                    <div className="text-lg font-bold tracking-widest">
                        {student.nis} / {student.nisn || '-'}
                    </div>
                </div>

                {/* Footer Section: School Info */}
                <div className="flex flex-col items-center gap-2 mb-4">
                    <h2 className="text-lg font-bold uppercase font-serif">
                        KEMENTERIAN PENDIDIKAN DAN KEBUDAYAAN<br/>
                        REPUBLIK INDONESIA
                    </h2>
                    
                    <div className="mt-4 text-lg font-bold">
                        {settings.school_name || 'SMK BINA INSAN MULIA'}
                    </div>
                     <div className="text-md">
                        {settings.city || 'Sukabumi'}
                    </div>
                    <div className="text-sm mt-8 font-mono">
                         {new Date().getFullYear()}
                    </div>
                </div>

            </div>
            
             {/* Decorative Border (Optional, typical for covers) */}
             <div className="print:block absolute inset-0 border-[3px] border-double border-black pointer-events-none m-[1cm] hidden"></div>
        </div>
    );
}
