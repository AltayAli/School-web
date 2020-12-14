using System.ComponentModel.DataAnnotations;

namespace School.Areas.Admin.ViewModels
{
    public class GroupOpModel
    {
        [StringLength(100)]
        [Required]
        public string Name { get; set; }
    }
}
