using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using School.Areas.Extensions;

namespace School
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Seed().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            var webHost = WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();

            return webHost;
        }
    }
}
