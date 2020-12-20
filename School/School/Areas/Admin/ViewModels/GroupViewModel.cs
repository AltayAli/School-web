using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace School.Areas.Admin.ViewModels
{
    public class GroupViewModel
    {
        [Required]
        public string Name { get; set; }
    }
}
