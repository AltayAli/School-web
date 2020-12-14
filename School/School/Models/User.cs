using System.ComponentModel.DataAnnotations;

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
        public string PhotoURL { get; set; }
        [StringLength(100)]
        public string UserName { get; set; }
        public string Password { get; set; }
        public int Role_Id { get; set; }
        public int Class_Id { get; set; }
    }
}
