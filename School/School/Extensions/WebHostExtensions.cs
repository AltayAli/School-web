using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using School.Datas;

namespace School.Areas.Extensions
{
    /// <summary>
    /// Author: Altay Ali
    /// Description:
    /// Service to execute migrations and seeders on start.
    /// </summary>
    public static class WebHostExtensions
    {
        /// <summary>
        /// Seed method
        /// </summary>
        /// <param name="host"></param>
        /// <returns></returns>
        public static IWebHost Seed(this IWebHost host)
        {
            using(var scope = host.Services.CreateScope())
            {
                var service = scope.ServiceProvider;
                DataContext _context = service.GetRequiredService<DataContext>();
                _context.Database.Migrate();
            }
            return host;
        }
    }
}
