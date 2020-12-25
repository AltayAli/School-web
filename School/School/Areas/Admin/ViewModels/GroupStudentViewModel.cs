using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School.Areas.Admin.ViewModels
{
    public class GroupStudentViewModel
    {
        public int GroupId { get; set; }
        public List<int> StudentsId { get; set; }
    } 
}
