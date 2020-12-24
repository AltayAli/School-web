using System;
using System.ComponentModel.DataAnnotations;

namespace School.ViewModels
{
    public class LoginViewModel
    {
        [Required]
        public string UserName { get; set; }
        [DataType(DataType.Password)]
        [Required]
        public string Password { get; set; }
    }
}
