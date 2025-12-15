import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

interface User {
    id: number;
    name: string;
}

interface Student {
    id: number;
    nis: string;
    nisn: string;
    user: User;
    place_of_birth: string;
    date_of_birth: string;
    school_class?: {
        name: string;
    };
}

interface Subject {
    id: number;
    name: string;
    subject_group?: 'A' | 'B' | 'C';
}

interface SubjectGrade {
    subject: Subject;
    teacher: User;
    avgDaily: number;
    avgDailyExam: number;
    scoreMidterm: number;
    scoreFinal: number;
    finalGrade: number;
    predicate: string;
}

interface AttitudeGrade {
    aspect: string;
    grade: string;
    description: string;
}

interface AttendanceSummary {
    present: number;
    sick: number;
    permission: number;
    absent: number;
}

interface Settings {
    headmaster_name: string;
    headmaster_nuks?: string;
    logo_watermark?: string;
    school_address: string;
    city: string;
    report_date?: string;
    footer_text?: string;
}

interface HomeroomNote {
    id: number;
    student_id: number;
    notes: string;
    teacher_id: number;
}

interface HomeroomTeacher {
    id: number;
    user_id: number;
    class_id: number;
    academic_year: string;
    user: User;
}

export default function Print({
    student,
    settings,
    subjectGrades,
    attendanceSummary,
    attitudeGrades,
    homeroomNote,
    homeroomTeacher,
    semester,
    academicYear,
}: {
    student: Student;
    settings: Settings;
    subjectGrades: SubjectGrade[];
    attendanceSummary: AttendanceSummary;
    attitudeGrades: Record<string, AttitudeGrade>;
    homeroomNote: HomeroomNote | null;
    homeroomTeacher: HomeroomTeacher | null;
    semester: string;
    academicYear: string;
}) {
    useEffect(() => {
        window.print();
    }, []);

    const logoUrl = settings.logo_watermark 
        ? `/storage/${settings.logo_watermark}` 
        : null;

    // Group subjects
    const groupA = subjectGrades.filter(g => !g.subject.subject_group || g.subject.subject_group === 'A');
    const groupB = subjectGrades.filter(g => g.subject.subject_group === 'B');
    const groupC = subjectGrades.filter(g => g.subject.subject_group === 'C');

    const renderGradeRow = (grade: SubjectGrade, index: number) => (
        <tr key={index}>
            <td className="center">{index + 1}</td>
            <td>{grade.subject.name}</td>
            <td className="center"><strong>{grade.finalGrade}</strong></td>
            <td className="capaian">
                {grade.finalGrade >= 85 
                    ? `Menunjukkan pemahaman yang sangat mendalam dalam materi ${grade.subject.name}.`
                    : grade.finalGrade >= 75
                    ? `Menunjukkan pemahaman yang baik dalam materi ${grade.subject.name}.`
                    : grade.finalGrade >= 60
                    ? `Cukup memahami materi ${grade.subject.name}, perlu peningkatan.`
                    : `Perlu bimbingan lebih lanjut dalam materi ${grade.subject.name}.`}
            </td>
        </tr>
    );

    return (
        <>
            <Head title={`Rapot - ${student.user.name}`} />
            
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
                }
                
                * {
                    color: #000 !important;
                }
                
                body {
                    font-family: Arial, sans-serif;
                    font-size: 10pt;
                    line-height: 1.3;
                    color: #000;
                    background: white;
                    position: relative;
                }
                
                .print-container {
                    max-width: 21cm;
                    margin: 0 auto;
                    background: transparent;
                    color: #000;
                    position: relative;
                    z-index: 10;
                }
                
                .watermark {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    opacity: 0.1 !important;
                    z-index: 9999;
                    width: 400px;
                    height: 400px;
                    pointer-events: none;
                }
                
                .watermark img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                @media print {
                   .watermark {
                        position: absolute; /* Fix for some browsers blocking fixed in print */
                        display: block !important;
                        opacity: 0.1 !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                   }
                }
                
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                    padding-bottom: 8px;
                    border-bottom: 3px solid #000;
                }
                
                .header h1 {
                    font-size: 14pt;
                    font-weight: bold;
                    margin: 3px 0;
                }
                
                .header p {
                    font-size: 9pt;
                    margin: 2px 0;
                }
                
                .student-info {
                    margin-bottom: 15px;
                }
                
                .info-row {
                    display: flex;
                    margin-bottom: 4px;
                }
                
                .info-row .label {
                    width: 140px;
                    font-size: 9pt;
                }
                
                .info-row .separator {
                    width: 15px;
                    text-align: center;
                }
                
                .info-row .value {
                    flex: 1;
                    font-weight: bold;
                    font-size: 9pt;
                }
                
                .section-title {
                    font-weight: bold;
                    font-size: 10pt;
                    margin: 15px 0 8px 0;
                    padding: 5px 8px;
                    background-color: #e0e0e0;
                    border: 1px solid #000;
                    text-align: center;
                }
                
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 10px;
                    font-size: 9pt;
                }
                
                table, th, td {
                    border: 1px solid #000;
                }
                
                th, td {
                    padding: 4px 6px;
                    text-align: left;
                    vertical-align: top;
                }
                
                th {
                    background-color: #e0e0e0;
                    font-weight: bold;
                    text-align: center;
                }
                
                td.center {
                    text-align: center;
                }
                
                .capaian {
                    font-size: 8.5pt;
                    font-style: italic;
                }

                .group-header td {
                    background-color: #f0f0f0;
                    font-weight: bold;
                    padding-left: 10px;
                }
                
                .signature-section {
                    margin-top: 30px;
                    font-size: 9pt;
                    position: relative;
                }

                .signature-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 40px;
                }
                
                .signature-box {
                    text-align: center;
                    width: 35%;
                }
                
                .signature-line {
                    margin-top: 60px;
                    padding-top: 2px;
                }

                .signature-center {
                    text-align: center;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }

                .center-box {
                    text-align: center;
                    width: 40%;
                }

                .footer-text {
                    margin-top: 20px;
                    text-align: center;
                    font-size: 8pt;
                    color: #666;
                }
            `}</style>

            {/* Watermark */}
            {logoUrl && (
                <div className="watermark">
                    <img src={logoUrl} alt="Watermark" />
                </div>
            )}

            <div className="print-container">
                {/* Header */}
                <div className="header">
                    <h1>LAPORAN HASIL BELAJAR SISWA</h1>
                    <p>{settings.school_address}</p>
                    <p>Tahun Pelajaran {academicYear} - Semester {semester}</p>
                </div>

                {/* Student Info */}
                <div className="student-info">
                    <div style={{display: 'flex', gap: '30px'}}>
                        <div style={{flex: 1}}>
                            <div className="info-row">
                                <div className="label">Nama Siswa</div>
                                <div className="separator">:</div>
                                <div className="value">{student.user.name}</div>
                            </div>
                            <div className="info-row">
                                <div className="label">Nomor Induk / NISN</div>
                                <div className="separator">:</div>
                                <div className="value">{student.nis} / {student.nisn}</div>
                            </div>
                            <div className="info-row">
                                <div className="label">Program Studi</div>
                                <div className="separator">:</div>
                                <div className="value">{student.school_class?.name || '-'}</div>
                            </div>
                        </div>
                        <div style={{flex: 1}}>
                            <div className="info-row">
                                <div className="label">Kelas</div>
                                <div className="separator">:</div>
                                <div className="value">{student.school_class?.name || '-'}</div>
                            </div>
                            <div className="info-row">
                                <div className="label">Fase</div>
                                <div className="separator">:</div>
                                <div className="value">F</div>
                            </div>
                            <div className="info-row">
                                <div className="label">Semester</div>
                                <div className="separator">:</div>
                                <div className="value">{semester} ({semester === 'Ganjil' ? '1' : '2'})</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Academic Grades with Grouping */}
                <div className="section-title">MATA PELAJARAN</div>
                <table>
                    <thead>
                        <tr>
                            <th style={{width: '30px'}}>No</th>
                            <th>Mata Pelajaran</th>
                            <th style={{width: '60px'}}>Nilai</th>
                            <th style={{width: '350px'}}>Capaian Pembelajaran</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Group A */}
                        {groupA.length > 0 && (
                            <>
                                <tr className="group-header">
                                    <td colSpan={4}>A. Muatan Nasional</td>
                                </tr>
                                {groupA.map((grade, idx) => renderGradeRow(grade, idx))}
                            </>
                        )}
                        
                        {/* Group B */}
                        {groupB.length > 0 && (
                            <>
                                <tr className="group-header">
                                    <td colSpan={4}>B. Muatan Kewilayahan</td>
                                </tr>
                                {groupB.map((grade, idx) => renderGradeRow(grade, idx))}
                            </>
                        )}
                        
                        {/* Group C */}
                        {groupC.length > 0 && (
                            <>
                                <tr className="group-header">
                                    <td colSpan={4}>C. Muatan Peminatan Kejuruan</td>
                                </tr>
                                {groupC.map((grade, idx) => renderGradeRow(grade, idx))}
                            </>
                        )}
                    </tbody>
                </table>

                {/* Attendance */}
                <div className="section-title">KETIDAKHADIRAN</div>
                <table style={{width: '60%'}}>
                    <tbody>
                        <tr>
                            <td style={{width: '30px'}} className="center">1</td>
                            <td>Sakit</td>
                            <td className="center" style={{width: '100px'}}><strong>{attendanceSummary.sick} hari</strong></td>
                        </tr>
                        <tr>
                            <td className="center">2</td>
                            <td>Izin</td>
                            <td className="center"><strong>{attendanceSummary.permission} hari</strong></td>
                        </tr>
                        <tr>
                            <td className="center">3</td>
                            <td>Tanpa Keterangan</td>
                            <td className="center"><strong>{attendanceSummary.absent} hari</strong></td>
                        </tr>
                    </tbody>
                </table>

                {/* Homeroom Note */}
                <div className="section-title">CATATAN WALI KELAS</div>
                <div style={{padding: '10px', border: '1px solid #000', fontSize: '9pt', textAlign: 'justify', minHeight: '60px'}}>
                    {homeroomNote?.notes || '-'}
                </div>

                {/* Signatures */}
                <div className="signature-section">
                    {/* Top Row: Parent and Homeroom Teacher */}
                    <div className="signature-row">
                        <div className="signature-box">
                            <p>Orang Tua/Wali</p>
                            <div className="signature-line">
                                <p>(...........................)</p>
                            </div>
                        </div>
                        <div className="signature-box">
                            <p>{settings.city}, {settings.report_date 
                                ? new Date(settings.report_date).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })
                                : new Date().toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })
                            }</p>
                            <p>Wali Kelas</p>
                            <div className="signature-line">
                                <p><strong>{homeroomTeacher?.user?.name || '(...........................)'}</strong></p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Headmaster Center */}
                    <div className="signature-center">
                        <div className="center-box">
                            <p style={{marginBottom: '5px'}}>Mengetahui,</p>
                            <p>Kepala Sekolah</p>
                            <div className="signature-line">
                                <p style={{fontWeight: 'bold', textDecoration: 'underline'}}>{settings.headmaster_name}</p>
                                {settings.headmaster_nuks && (
                                    <p style={{fontSize: '8pt'}}>NUKS. {settings.headmaster_nuks}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {settings.footer_text && (
                    <div className="footer-text">
                        <p>{settings.footer_text}</p>
                    </div>
                )}
            </div>
        </>
    );
}
