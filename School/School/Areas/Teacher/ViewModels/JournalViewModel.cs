using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School.Areas.Teacher.ViewModels
{
    public class JournalViewModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Score { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
    }
}
