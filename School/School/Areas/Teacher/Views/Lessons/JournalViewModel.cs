using School.Models;
using System;
using System.Collections.Generic;

namespace School.Areas.Teacher.Views.Lessons
{
    public class JournalViewModel
    {
        List<DateTime> Dates { get; set; }
        List<int> StudentsId { get; set; }
        List<int> Journals { get; set; }
    }
}
