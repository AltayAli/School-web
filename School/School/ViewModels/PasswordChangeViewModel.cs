using System.ComponentModel.DataAnnotations;

namespace School.ViewModels
{
    public class PasswordChangeViewModel
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string OldPassword { get; set; }
        [Required]
        [StringLength(8)]
        public string NewPassword { get; set; }
    }
}
