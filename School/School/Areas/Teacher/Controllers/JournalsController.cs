using DevExtreme.AspNet.Data.ResponseModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using School.Areas.Extensions;
using School.Areas.Teacher.Services;
using School.Areas.Teacher.ViewModels;
using System;

namespace School.Areas.Teacher.Controllers
{
    [Area("Teacher")]
    [Route("[area]/[controller]/{action=Index}")]
    public class JournalsController : Controller
    {
        private readonly IServices _services;
        public JournalsController(IServices services)
        {
            _services = services;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet("{groupId}")]
        public object GetList(DevxLoadOptions options, [FromRoute] int groupId)
        => _services.JournalService.GetJournal( groupId, HttpContext.Session.GetInt32("id").Value);
    }
}
