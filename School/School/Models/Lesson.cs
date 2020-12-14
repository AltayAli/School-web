using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace School.Models
{
    public class Lesson
    {
        public int Id { get; set; }
        [StringLength(100)]
        public string Name { get; set; }
        public DateTime Date { get; set; }
        [StringLength(150)]
        public string File_Name { get; set; }
    }
}
