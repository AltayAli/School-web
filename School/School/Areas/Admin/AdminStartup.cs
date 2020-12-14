using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using School.Areas.Admin.Repositories;
using School.Datas;

namespace School.Areas.Admin
{
    public class AdminStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) =>
            {
                services.AddDbContext<DataContext>(x => x.UseSqlServer(context.Configuration.GetConnectionString("DataContext")));

                services.AddScoped<IRepository, Repository>();
            });
        }
    }
}
