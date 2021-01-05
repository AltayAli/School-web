using Microsoft.AspNetCore.Http;
using School.Datas;
using School.Extensions;
using School.ViewModels;
using System.Linq;

namespace School.Services
{
    public class UsersService : IUsersService
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _accessor;
        public UsersService(DataContext context, 
                                        IHttpContextAccessor accessor)
        {
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
                    _accessor.HttpContext.Session.SetString("photo_url", user?.PhotoURL??"user-image.png");
                    _accessor.HttpContext.Session.SetString("role", user.Role.ToString());
                    _accessor.HttpContext.Session.SetInt32("id", user.Id);
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

        public void DeleteSession()
        {
            _accessor.HttpContext.Session.Clear();
        }

        public UserViewModel GetUser()
        => _context.Users.Where(x => x.Id == _accessor.HttpContext.Session.GetInt32("id").Value)
                    .Select(x => new UserViewModel {
                        Name = x.Name,
                        PhotoURL = x.PhotoURL,
                        Surname = x.Surname
                    }).FirstOrDefault();

        public void Update(UserViewModel model)
        {
            var updatedModel = _context.Users.FirstOrDefault(x => x.Id == _accessor.HttpContext.Session.GetInt32("id").Value);

            _context.Entry(updatedModel).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            updatedModel.Name = model.Name;
            updatedModel.Surname = model.Surname;
            updatedModel.PhotoURL = model.PhotoURL;
            updatedModel.Password = model.Password.CreatePassword();
            _context.SaveChanges();


            _accessor.HttpContext.Session.SetString("full_name", $"{model.Name} {model.Surname}");
            _accessor.HttpContext.Session.SetString("photo_url", model.PhotoURL ?? "user-image.png");
        }
    }
}
