import { Head } from '@inertiajs/react';
import React from 'react';

interface Props {
    student: any;
    settings: any;
    schoolProfile: any;
}

export default function PrintCover({ student, settings, schoolProfile }: Props) {
    // Helper to format date
    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <div className="bg-white text-black font-serif min-h-screen p-8 print:p-0">
            <Head title={`Buku Induk - ${student.user.name}`} />

            <style>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 1.5cm;
                    }
                    body {
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                    .no-print {
                        display: none;
                    }
                    .watermark {
                        position: absolute;
                        display: block !important;
                        opacity: 0.08 !important;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 0;
                    }
                }
                
                table td {
                    vertical-align: top;
                    padding: 2px 4px;
                }
                
                .watermark {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    opacity: 0.1;
                    z-index: 0;
                    width: 350px;
                    height: 350px;
                    pointer-events: none;
                }
            `}</style>
            
            {settings.logo_watermark && (
                <div className="watermark">
                    <img src={`/storage/${settings.logo_watermark}`} alt="Watermark" className="w-full h-full object-contain" />
                </div>
            )}
            
            <div className="no-print mb-8 flex justify-end gap-2">
                <button 
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-sans text-sm"
                >
                    Cetak / Simpan PDF
                </button>
            </div>

            {/* Cover Page Context - Usually "KETERANGAN TENTANG DIRI SISWA" */}
            <div className="max-w-[21cm] mx-auto relative z-10">
                <div className="text-center mb-6">
                    <h1 className="text-lg font-bold uppercase mb-1">Keterangan Tentang Diri Siswa</h1>
                </div>

                <table className="w-full text-[10pt]">
                    <tbody>
                        <tr>
                            <td className="w-8">1.</td>
                            <td className="w-[220px]">Nama Siswa (Lengkap)</td>
                            <td className="px-1">:</td>
                            <td className="font-bold uppercase">{student.user.name}</td>
                        </tr>
                        <tr>
                            <td>2.</td>
                            <td>Nomor Induk Siswa Nasional</td>
                            <td className="px-1">:</td>
                            <td>{student.nisn || '-'}</td>
                        </tr>
                        <tr>
                            <td>3.</td>
                            <td>Nomor Induk Siswa</td>
                            <td className="px-1">:</td>
                            <td>{student.nis || '-'}</td>
                        </tr>
                        <tr>
                            <td>4.</td>
                            <td>Tempat dan Tanggal Lahir</td>
                            <td className="px-1">:</td>
                            <td>
                                {student.place_of_birth || '-'}, {formatDate(student.date_of_birth)}
                            </td>
                        </tr>
                        <tr>
                            <td>5.</td>
                            <td>Jenis Kelamin</td>
                            <td className="px-1">:</td>
                            <td>
                                {student.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                            </td>
                        </tr>
                        <tr>
                            <td>6.</td>
                            <td>Agama</td>
                            <td className="px-1">:</td>
                            <td>{student.religion || '-'}</td>
                        </tr>
                         <tr>
                            <td>7.</td>
                            <td>Anak ke</td>
                            <td className="px-1">:</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>8.</td>
                            <td>Alamat Peserta Didik</td>
                            <td className="px-1">:</td>
                            <td>{student.address || '-'}</td>
                        </tr>
                        <tr>
                            <td>9.</td>
                            <td>Nomor Telepon Rumah</td>
                            <td className="px-1">:</td>
                            <td>-</td>
                        </tr>
                         <tr>
                            <td>10.</td>
                            <td>Sekolah Asal</td>
                            <td className="px-1">:</td>
                            <td>{student.previous_school || '-'}</td>
                        </tr>
                        <tr>
                            <td>11.</td>
                            <td>Diterima di sekolah ini</td>
                            <td className="px-1">:</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="pl-4">a. Di kelas</td>
                            <td className="px-1">:</td>
                            <td>{student.school_class?.name || '-'}</td>
                        </tr>
                         <tr>
                            <td></td>
                            <td className="pl-4">b. Pada tanggal</td>
                            <td className="px-1">:</td>
                            <td>{formatDate(student.created_at)}</td>
                        </tr>
                         <tr>
                            <td></td>
                            <td className="pl-4">c. Semester</td>
                            <td className="px-1">:</td>
                            <td>{settings?.semester || 'Ganjil'}</td>
                        </tr>

                        <tr>
                            <td>12.</td>
                            <td className="font-bold">Orang Tua</td>
                            <td className="px-1"></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="pl-4">a. Nama Ayah</td>
                            <td className="px-1">:</td>
                            <td>{student.father_name || '-'}</td>
                        </tr>
                         <tr>
                            <td></td>
                            <td className="pl-4">b. Nama Ibu</td>
                            <td className="px-1">:</td>
                            <td>{student.mother_name || '-'}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="pl-4">c. Alamat Orang Tua</td>
                            <td className="px-1">:</td>
                            <td>{student.address || '-'}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="pl-4">d. Nomor Telepon/HP</td>
                            <td className="px-1">:</td>
                            <td>{student.parent_phone || '-'}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="pl-4">e. Pekerjaan Ayah</td>
                            <td className="px-1">:</td>
                            <td>{student.father_job || '-'}</td>
                        </tr>
                         <tr>
                            <td></td>
                            <td className="pl-4">f. Pekerjaan Ibu</td>
                            <td className="px-1">:</td>
                            <td>{student.mother_job || '-'}</td>
                        </tr>

                         <tr>
                            <td>13.</td>
                            <td className="font-bold">Wali Peserta Didik</td>
                            <td className="px-1"></td>
                            <td></td>
                        </tr>
                         <tr>
                            <td></td>
                            <td className="pl-4">a. Nama Wali</td>
                            <td className="px-1">:</td>
                            <td>{student.guardian_name || '-'}</td>
                        </tr>
                         <tr>
                            <td></td>
                            <td className="pl-4">b. Alamat Wali</td>
                            <td className="px-1">:</td>
                            <td>{student.guardian_address || '-'}</td> 
                        </tr>
                         <tr>
                            <td></td>
                            <td className="pl-4">c. Pekerjaan Wali</td>
                            <td className="px-1">:</td>
                            <td>{student.guardian_job || '-'}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Footer Signature */}
                 <div className="mt-8 flex justify-end">
                    <div className="w-[300px] text-center text-[10pt]">
                        <div className="mb-2">
                             Bandung, Juli {new Date().getFullYear()}
                        </div>
                        <div className="mb-20 font-bold">
                            Kepala Sekolah,
                        </div>
                         <div className="font-bold border-b border-black inline-block min-w-[200px]">
                            {settings?.headmaster_name || '.......................'}
                        </div>
                        <div className="mt-1">
                            NUKS. {settings?.headmaster_nuks || '.......................'}
                        </div>
                    </div>
                </div>

                {/* Photo Box */}
                 <div className="mt-[-160px] ml-12 w-[3cm] h-[4cm] border border-black flex items-center justify-center text-xs text-center p-2">
                     Pas Foto<br/>3 x 4
                 </div>
            </div>
        </div>
    );
}
