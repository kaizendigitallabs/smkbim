<?php

namespace App\Exports;

use App\Models\SchoolClass;
use App\Models\Subject;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ClassAllSubjectsGradeExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithStyles
{
    protected $classId;
    protected $subjects;

    public function __construct($classId)
    {
        $this->classId = $classId;
        // Get all subjects (or active ones for this class level?)
        // For simplicity, let's get all subjects. Or filtering by assignments would be safer.
        // Let's use subjects that have assignments for this class.
        $this->subjects = Subject::whereHas('assignments', function ($q) {
            $q->where('class_id', $this->classId);
        })->orWhereHas('assignments', function($q) {
            $q->whereNull('class_id'); // Global assignments
        })->orderBy('name')->get();
    }

    public function collection()
    {
        $schoolClass = SchoolClass::findOrFail($this->classId);
        return $schoolClass->students()->orderBy('nis')->get();
    }

    public function headings(): array
    {
        $headers = ['NIS', 'Nama Siswa'];
        foreach ($this->subjects as $subject) {
            $headers[] = $subject->name;
        }
        return $headers;
    }

    public function map($student): array
    {
        $row = [
            $student->nis,
            $student->user->name ?? $student->name,
        ];

        // Empty cells for grades
        foreach ($this->subjects as $subject) {
            $row[] = '';
        }

        return $row;
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}
