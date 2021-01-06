using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using School.Areas.Student.Services;
using School.Datas;


[assembly: HostingStartup(typeof(School.Areas.Student.StudentStartup))]
namespace School.Areas.Student
{
    public class StudentStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) =>
            {
                services.AddDbContext<DataContext>(x => x.UseSqlServer(context.Configuration.GetConnectionString("DataContext")));


                services.AddScoped<IServices, Services.Services>();
            });
        }
    }
}
