using System.ComponentModel.DataAnnotations;

namespace School.Models
{
    public class Role
    {
        public int Id { get; set; }
        [StringLength(100)]
        public string Name { get; set; }
    }
}
