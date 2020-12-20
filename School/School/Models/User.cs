using School.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace School.Models
{
    public class User
    {
        public int Id { get; set; }
        [StringLength(100)]
        public string Name { get; set; }
        [StringLength(100)]
        public string Surname { get; set; }
        [StringLength(100)]
        [JsonPropertyName("photourl")]
        public string PhotoURL { get; set; }
        [StringLength(100)]
        [JsonPropertyName("username")]
        public string UserName { get; set; }
        public string Password { get; set; }
        public Roles Role { get; set; }
        public int Class_Id { get; set; }
        public bool MustChangePass { get; set; }
    }
}
