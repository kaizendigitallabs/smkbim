<?php

namespace App\Exports\Sheets;

use App\Models\SchoolClass;
use App\Models\Subject;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ClassGradeSheetExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithStyles, WithTitle
{
    protected $classId;
    protected $title;
    protected $academicYear;
    protected $subjects;

    public function __construct($classId, $title, $academicYear)
    {
        $this->classId = $classId;
        $this->title = $title;
        $this->academicYear = $academicYear;
        
        $this->subjects = Subject::whereHas('assignments', function ($q) {
            $q->where('class_id', $this->classId)
              ->where('academic_year', $this->academicYear);
        })->orWhereHas('assignments', function($q) {
            $q->whereNull('class_id')
              ->where('academic_year', $this->academicYear);
        })->orderBy('name')->get();
    }

    public function collection()
    {
        $schoolClass = SchoolClass::findOrFail($this->classId);
        return $schoolClass->students()->orderBy('nis')->get();
    }

    public function headings(): array
    {
        $headers = ['No', 'NIS', 'Nama Siswa'];
        foreach ($this->subjects as $subject) {
            $headers[] = $subject->name;
        }
        return $headers;
    }

    public function map($student): array
    {
        static $no = 0;
        $no++;

        $row = [
            $no,
            $student->nis,
            $student->user->name ?? $student->name,
        ];

        foreach ($this->subjects as $subject) {
            $row[] = '';
        }

        return $row;
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => [
                'font' => ['bold' => true],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    ],
                ],
            ],
            // Apply borders to all data rows too? Maybe just the header for now to match 'bold' style.
            // If the user wants full table borders:
            'A1:' . $sheet->getHighestColumn() . $sheet->getHighestRow() => [
                 'borders' => [
                    'allBorders' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    ],
                ],
            ],
        ];
    }

    public function title(): string
    {
        return $this->title;
    }
}
