using System.ComponentModel.DataAnnotations;

namespace School.Areas.Admin.ViewModels
{
    public class GroupViewModel
    {
        public int Id { get; set; }
        [StringLength(100)]
        public string Name { get; set; }
        [StringLength(100)]
        public string  TeacherName { get; set; }
    }
}
