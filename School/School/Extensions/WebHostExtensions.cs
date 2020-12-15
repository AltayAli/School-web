using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using School.Datas;
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

                if (!_context.Roles.Any())
                {
                    _context.Roles.AddRange(new Role { Name = "Admin" },
                                            new Role { Name = "Teacher" },
                                            new Role { Name = "Student" });

                    if (!_context.Users.Any(x=> x.Role_Id == 1))
                    {
                        _context.Users.Add(new User
                        {
                            Name = "Admin",
                            Surname = "",
                            Password = "Admin@123".CreatePassword(),
                            PhotoURL = "user.png",
                            Role_Id = 1,
                            UserName = "admin",
                            MustChangePass = false,
                            Class_Id = 0
                        });
                    }
                        _context.SaveChanges();
                }
            }
            return host;
        }
    }
}
