<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use App\Models\SubjectTeacherAssignment;
use App\Models\Subject;

class ClassAllSubjectsGradeImport implements WithMultipleSheets
{
    protected $classId;
    protected $semester;
    protected $academicYear;

    public function __construct($classId, $semester, $academicYear)
    {
        $this->classId = $classId;
        $this->semester = $semester;
        $this->academicYear = $academicYear;
    }

    public function sheets(): array
    {
        // 1. Get all assignments for this class + global
        $assignments = SubjectTeacherAssignment::with('subject')
            ->where('academic_year', $this->academicYear)
            ->where(function ($query) {
                $query->where('class_id', $this->classId)
                      ->orWhereNull('class_id');
            })
            ->get();

        $sheets = [];

        foreach ($assignments as $assignment) {
            $sheetTitle = substr($assignment->subject->name, 0, 31);
            
            // Map the Sheet Name to the GradeImport class
            // GradeImport handles the inner logic (parsing UH1, Tugas1, etc.)
            $sheets[$sheetTitle] = new GradeImport($assignment->id, $this->semester, $this->academicYear);
        }

        return $sheets;
    }
}
