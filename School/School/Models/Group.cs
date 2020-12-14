using System.ComponentModel.DataAnnotations;

namespace School.Models
{
    public class Group
    {
        public int Id { get; set; }
        [StringLength(100)]
        public string Name { get; set; }
        public int TeacherId { get; set; }
    }
}
