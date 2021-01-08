using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using Microsoft.AspNetCore.Mvc;
using School.Areas.Extensions;
using School.Areas.Student.Services;

namespace School.Areas.Student.Controllers
{
    [Area("Student")]
    [Route("[area]/[controller]/{action=Index}")]
    public class JournalController : Controller
    {
        private readonly IServices _services;
        public JournalController(IServices services)
        {
            _services = services;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public LoadResult GetList(DevxLoadOptions options)
        => DataSourceLoader.Load(_services.GetJournal(), options);
    }
}
