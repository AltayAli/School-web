using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using Microsoft.AspNetCore.Mvc;
using School.Areas.Extensions;
using School.Areas.Student.Services;

namespace School.Areas.Student.Controllers
{
    [Area("Student")]
    [Route("[area]/[controller]/{action=Index}")]
    public class HomeController : Controller
    {
        private readonly IServices _services;
        public HomeController(IServices services)
        {
            _services = services;
        }
        public IActionResult Index()
        {
            return View();
        }
        public LoadResult GetCalendar(DevxLoadOptions options)
        => DataSourceLoader.Load(_services.GetCalendar(), options);
    }
}
