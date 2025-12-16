<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class GradeTemplateExport implements FromCollection, WithHeadings, WithMapping, WithStyles, ShouldAutoSize, WithTitle
{
    protected $students;
    protected $title;

    public function __construct($students, $title = 'Template')
    {
        $this->students = $students;
        $this->title = $title;
    }

    public function title(): string
    {
        return $this->title;
    }

    public function collection()
    {
        return $this->students;
    }

    public function headings(): array
    {
        $headings = ['No', 'NIS', 'Nama Siswa'];
        
        // Add 10 UH columns
        for ($i = 1; $i <= 10; $i++) {
            $headings[] = "UH $i";
        }
        
        // Add 10 Tugas columns
        for ($i = 1; $i <= 10; $i++) {
            $headings[] = "Tugas $i";
        }
        
        $headings[] = 'UTS';
        $headings[] = 'UAS';
        
        return $headings;
    }

    public function map($student): array
    {
        static $no = 0;
        $no++;
        
        $row = [
            $no,
            $student->nis,
            $student->user->name,
        ];
        
        // Add empty cells for 10 UH
        for ($i = 1; $i <= 10; $i++) {
            $row[] = '';
        }

        // Add empty cells for 10 Tugas
        for ($i = 1; $i <= 10; $i++) {
            $row[] = '';
        }
        
        $row[] = ''; // UTS
        $row[] = ''; // UAS
        
        return $row;
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}
