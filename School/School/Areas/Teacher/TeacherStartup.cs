﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using School.Areas.Teacher.Repositories;
using School.Areas.Teacher.Services;
using School.Datas;


[assembly: HostingStartup(typeof(School.Areas.Teacher.StudentStartup))]
namespace School.Areas.Teacher
{
    public class StudentStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) =>
            {
                services.AddDbContext<DataContext>(x => x.UseSqlServer(context.Configuration.GetConnectionString("DataContext")));

                services.AddScoped<IRepository, Repository>();
                services.AddScoped<IServices, Services.Services>();
            });
        }
    }
}
