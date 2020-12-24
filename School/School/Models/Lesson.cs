using System;
using System.ComponentModel.DataAnnotations;

namespace School.Models
{
    public class Lesson
    {
        public int Id { get; set; }
        [StringLength(100)]
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        [StringLength(150)]
        public string File_Name { get; set; }
    }
}
