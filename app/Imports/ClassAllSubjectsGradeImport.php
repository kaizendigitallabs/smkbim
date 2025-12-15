<?php

namespace App\Imports;

use App\Models\Grade;
use App\Models\Student;
use App\Models\Subject;
use App\Models\SubjectTeacherAssignment;
use App\Models\SchoolClass;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ClassAllSubjectsGradeImport implements ToCollection, WithHeadingRow
{
    protected $classId;
    protected $type; // daily, mid, final
    protected $semester;
    protected $academicYear;

    public function __construct($classId, $type, $semester, $academicYear)
    {
        $this->classId = $classId;
        $this->type = $type;
        $this->semester = $semester;
        $this->academicYear = $academicYear;
    }

    public function collection(Collection $rows)
    {
        // 1. Identify Subjects from keys (headings) check vs database
        // This is tricky because headings are slugified by Laravel Excel.
        // We'll trust the input logic to match closest or assume strict naming.
        
        // Let's get all Assignments for this class to map 'Subject Name' -> Assignment ID
        $assignments = SubjectTeacherAssignment::with('subject')
            ->where('class_id', $this->classId)
            ->orWhereNull('class_id')
            ->get();
            
        // Map slugified subject name to Assignment ID
        $subjectMap = [];
        foreach ($assignments as $assignment) {
            $slug = \Illuminate\Support\Str::slug($assignment->subject->name, '_');
            $subjectMap[$slug] = $assignment->id;
            
            // Also map straight name just in case custom header handler isn't strict
            $subjectMap[strtolower($assignment->subject->name)] = $assignment->id;
        }

        foreach ($rows as $row) {
            if (!isset($row['nis'])) continue;

            $student = Student::where('nis', $row['nis'])->first();
            if (!$student) continue;

            // Iterate over row keys to find subjects
            foreach ($row as $key => $value) {
                if (in_array($key, ['nis', 'nama_siswa', 'no', '0'])) continue;
                if ($value === null || $value === '') continue;

                 // Check if key matches a subject
                 if (isset($subjectMap[$key])) {
                     $assignmentId = $subjectMap[$key];
                     
                     // Store Grade
                     Grade::updateOrCreate(
                         [
                             'student_id' => $student->id,
                             'subject_teacher_assignment_id' => $assignmentId,
                             'type' => $this->type,
                             'semester' => $this->semester,
                             'academic_year' => $this->academicYear,
                         ],
                         [
                             'score' => (float) $value,
                             'date' => now(), // Default date
                             'description' => 'Imported Bulk',
                         ]
                     );
                 }
            }
        }
    }
}
