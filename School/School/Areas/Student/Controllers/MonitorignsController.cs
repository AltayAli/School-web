using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using Microsoft.AspNetCore.Mvc;
using School.Areas.Extensions;
using School.Areas.Student.Services;
using School.Areas.Student.ViewModels;

namespace School.Areas.Student.Controllers
{
    [Area("Student")]
    [Route("[area]/[controller]/{action=Index}")]
    public class MonitorignsController : Controller
    {
        private readonly IServices _services;
        public MonitorignsController(IServices services)
        {
            _services = services;
        }
        public IActionResult Index()
        {
            return View();
        }
        public LoadResult GetMonitorings(DevxLoadOptions options)
            => _services.GetMonitorings(options);

        [HttpPost]
        public IActionResult Addfile([FromBody]MonitoringViewModel model)
        {
            try
            {
                _services.CreateMonitoring(model);

                return Created("", new { });
            }
            catch (System.Exception error)
            {
                return BadRequest(error.Message);
            }
        }
    }
}
