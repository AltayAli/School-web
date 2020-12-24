using Microsoft.AspNetCore.Http;
using School.Datas;
using School.Extensions;
using School.Models;
using School.ViewModels;
using System;
using System.Linq;

namespace School.Services
{
    public class UsersService : IUsersService
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _accessor;
        private readonly ITokenService _tokenService;
        public UsersService(DataContext context, 
                                        IHttpContextAccessor accessor,      
                                                ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
            _accessor = accessor;
        }
        public string  IsOk(LoginViewModel model)
        {
            if (_context.Users.Any(x=>x.UserName == model.UserName))
            { 
                
                var user = _context.Users.FirstOrDefault(x => x.UserName == model.UserName);

                if (model.Password.ReadPassword(user.Password))
                {
                    _accessor.HttpContext.Session.SetString("full_name", $"{user.Name} {user.Surname}");
                    _accessor.HttpContext.Session.SetString("photo_url", user.PhotoURL);
                    _accessor.HttpContext.Session.SetString("role", user.Role.ToString());
                    _accessor.HttpContext.Session.SetString("must_change_password", user.MustChangePass.ToString());

                    return user.Role.ToString();
                }
            }
            return "";
        }

        public string ChangePassword(PasswordChangeViewModel model)
        {
            if (_context.Users.Any(x => x.UserName == model.UserName))
            {

                var user = _context.Users.FirstOrDefault(x => x.UserName == model.UserName);

                if (model.OldPassword.ReadPassword(user.Password))
                {
                    _context.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    user.Password = model.NewPassword.CreatePassword();
                    user.MustChangePass = false;
                    _context.SaveChanges();
                    _accessor.HttpContext.Session.SetString("must_change_password", user.MustChangePass.ToString());

                    return user.Role.ToString();
                }
            }
            return "";
        }
    }
}
