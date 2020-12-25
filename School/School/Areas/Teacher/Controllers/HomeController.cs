using DevExtreme.AspNet.Data.ResponseModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using School.Areas.Extensions;
using School.Areas.Teacher.Services;

namespace School.Areas.Teacher.Controllers
{
    [Area("Teacher")]
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
        public LoadResult GetGroups(DevxLoadOptions options)
        => _services.GroupsService.GetGroupsListByTeacherId(options, HttpContext.Session.GetInt32("id").Value);
    }
}
