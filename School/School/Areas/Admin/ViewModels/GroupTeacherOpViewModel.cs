using System.ComponentModel.DataAnnotations;

namespace School.Areas.Admin.ViewModels
{
    public class GroupTeacherOpViewModel
    {
        [Required]
        public int GroupID { get; set; }
        [Required]
        public int TeacherID { get; set; }
    }
}
