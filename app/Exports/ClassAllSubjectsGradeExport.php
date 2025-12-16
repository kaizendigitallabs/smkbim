<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use App\Models\SchoolClass;
use App\Models\Subject;

class ClassAllSubjectsGradeExport implements WithMultipleSheets
{
    protected $classId;

    public function __construct($classId)
    {
        $this->classId = $classId;
    }

    public function sheets(): array
    {
        $schoolClass = SchoolClass::findOrFail($this->classId);
        $settings = \App\Models\ReportCardSetting::first();
        $academicYear = $settings->academic_year ?? date('Y') . '/' . (date('Y') + 1);

        $subjects = Subject::whereHas('assignments', function ($q) use ($academicYear) {
            $q->where('class_id', $this->classId)
              ->where('academic_year', $academicYear);
        })->orWhereHas('assignments', function($q) use ($academicYear) {
            $q->whereNull('class_id')
              ->where('academic_year', $academicYear);
        })->orderBy('name')->get();

        $students = $schoolClass->students()->orderBy('nis')->get();

        $sheets = [];

        foreach ($subjects as $subject) {
            // Excel sheet names max 31 chars
            $sheetTitle = substr($subject->name, 0, 31);
            $sheets[] = new GradeTemplateExport($students, $sheetTitle);
        }

        return $sheets;
    }
}
