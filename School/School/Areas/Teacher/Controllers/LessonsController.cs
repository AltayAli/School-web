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
    public class LessonsController : Controller
    {
        private readonly IServices _services;
        public LessonsController(IServices services)
        {
            _services = services;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet("{groupId}")]
        public LoadResult GetList(DevxLoadOptions options,[FromRoute]int groupId)
        => _services.LessonService.GetList(options,groupId, HttpContext.Session.GetInt32("id").Value);
        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Create([FromBody] LessonViewModel model)
        {
            try
            {
                model.TeacherId = HttpContext.Session.GetInt32("id").Value;
                _services.LessonService.Create(model);
                return Created("", new object());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult Update([FromRoute] int id)
        {
            return View(_services.LessonService.Get(id));
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] LessonViewModel model)
        {
            try
            {
                model.TeacherId = HttpContext.Session.GetInt32("id").Value;
                _services.LessonService.Update(id, model);
                return Created("", new object());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] int lessonId,[FromQuery] int groupId)
        {
            try
            {
                var teacherId = HttpContext.Session.GetInt32("id").Value;
                _services.LessonService.Delete(groupId,teacherId, lessonId);
                return Created("", new object());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
