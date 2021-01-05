using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace School.ViewModels
{
    public class UserViewModel
    {
        [StringLength(100)]
        public string Name { get; set; }
        [StringLength(100)]
        public string Surname { get; set; }
        [StringLength(100)]
        [JsonPropertyName("photourl")]
        public string PhotoURL { get; set; }
        [MinLength(8)]
        public string Password { get; set; }
    }
}
