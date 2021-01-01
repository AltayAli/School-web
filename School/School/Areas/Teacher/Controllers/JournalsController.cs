using DevExtreme.AspNet.Data;
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
        public LoadResult GetList(DevxLoadOptions options, [FromRoute] int groupId)
        => DataSourceLoader.Load(_services.JournalService
                                        .GetJournal(options, groupId, HttpContext.Session.GetInt32("id").Value)
                                        ,options);
        [HttpPut("{studentId}")]
        public IActionResult Update([FromRoute]int studentId,[FromBody] ScoreViewModel model)
        {
            try
            {

                _services.JournalService.Update(studentId, model);
                return Created("", new object());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
