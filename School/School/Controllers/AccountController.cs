using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using School.Services;
using School.ViewModels;
using System;

namespace School.Controllers
{
    public class AccountController : Controller
    {
        private readonly IUsersService _service;
        public AccountController(IUsersService service)
        {
            _service = service;
        }

        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Login(LoginViewModel model)
        {
            var role = _service.IsOk(model);

            var redirectUrl = role == "" ? "/" : $"/{role}/home";
            return Redirect(redirectUrl);
        }

        public IActionResult LogOut()
        {
            _service.DeleteSession();
            return Redirect("/");
        }
        public IActionResult ChangePassword()
        {
            return View();
        }
        [HttpPost]
        public IActionResult ChangePassword(PasswordChangeViewModel model)
        {
            var role = _service.ChangePassword(model);
            var redirectUrl = role == "" ? "/" : $"/{role}/home";
            return Redirect(redirectUrl);
        }
        public IActionResult Settings()
        {
            return View(_service.GetUser());
        }
        [HttpPost]
        public IActionResult Settings([FromBody]UserViewModel model)
        {

            try
            {
                _service.Update(model);
                return Ok(new { });
            }
            catch 
            {
                return BadRequest("Yanlışlıq oldu. Yenidən yoxlayın. Problem yarandıqda administratora müraciıt edin!");
            }
        }
    }
}
