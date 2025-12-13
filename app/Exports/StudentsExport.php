<?php

namespace App\Exports;

use App\Models\Student;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class StudentsExport implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Student::with(['user', 'schoolClass'])->get();
    }

    public function headings(): array
    {
        return [
            'Nama',
            'Email',
            'NIS',
            'NISN',
            'Kelas',
            'Tempat Lahir',
            'Tanggal Lahir',
            'Jenis Kelamin',
            'Alamat',
            'No HP Ortu',
        ];
    }

    public function map($student): array
    {
        return [
            $student->user->name,
            $student->user->email,
            $student->nis,
            $student->nisn,
            $student->schoolClass ? $student->schoolClass->name : '',
            $student->place_of_birth,
            $student->date_of_birth,
            $student->gender,
            $student->address,
            $student->parent_phone,
        ];
    }
}
