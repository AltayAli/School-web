using School.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace School.Areas.Admin.ViewModels
{
    public class UserViewModel
    {
        [StringLength(100)]
        [Required]
        public string Name { get; set; }
        [StringLength(100)]
        [Required]
        public string Surname { get; set; }
        [StringLength(100)]
        [Required]
        [JsonPropertyName("photourl")]
        public string PhotoURL { get; set; } = "user-image.png";
        [Required]
        public Roles Role { get; set; }
    }
}
