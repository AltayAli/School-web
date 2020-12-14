using System;
using System.ComponentModel.DataAnnotations;

namespace School.Models
{
    public class Journal
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        [StringLength(2)]
        public string Score { get; set; }
        public int Student_Id { get; set; }
    }
}
