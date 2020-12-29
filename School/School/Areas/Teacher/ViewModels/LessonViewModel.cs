using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace School.Areas.Teacher.ViewModels
{
    public class LessonViewModel
    {
        public int GroupId { get; set; }
        public int TeacherId { get; set; }
        public DateTime StartDate { get; set; }
        public int StartHour { get; set; }
        public int StartMinute { get; set; }
        public int EndHour { get; set; }
        public int EndMinute { get; set; }
        public string Name { get; set; }
        public string FileName { get; set; }
    }
}
