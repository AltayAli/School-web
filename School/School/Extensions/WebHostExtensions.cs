using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using School.Datas;
using School.Enums;
using School.Extensions;
using School.Models;
using System.Linq;

namespace School.Areas.Extensions
{
    public static class WebHostExtensions
    {
        public static IWebHost Seed(this IWebHost host)
        {
            using(var scope = host.Services.CreateScope())
            {
                var service = scope.ServiceProvider;
                DataContext _context = service.GetRequiredService<DataContext>();
                _context.Database.Migrate();

              
                if (!_context.Users.Any(x=> x.Role == Roles.Admin))
                {
                    _context.Users.Add(new User
                    {
                        Name = "Admin",
                        Surname = "",
                        Password = "Admin@123".CreatePassword(),
                        PhotoURL = "user.png",
                        Role = Roles.Admin,
                        UserName = "admin",
                        MustChangePass = false,
                        Class_Id = 0
                    });
                    _context.SaveChanges();
                }
                
            }
            return host;
        }
    }
}
