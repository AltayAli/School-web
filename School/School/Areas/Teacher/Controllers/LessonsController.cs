using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
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
        public LoadResult GetList(DevxLoadOptions options,int lessonId,int teacherid)
        => _services.LessonService.GetList(options,lessonId,teacherid);
        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Create([FromBody] LessonViewModel model)
        {
            try
            {
                _services.LessonService.Create(model);
                return Created("", new object());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //[HttpGet("{id}")]
        //public IActionResult Update([FromRoute] int id)
        //{
        //    return View(_services.UsersServices.Get(id));
        //}
        //[HttpPut("{id}")]
        //public IActionResult Update([FromRoute] int id, [FromBody] UserViewModel model)
        //{
        //    try
        //    {
        //        _services.UsersServices.Update(id, model);
        //        return Created("", new object());
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
        //[HttpDelete("{id}")]
        //public IActionResult Delete([FromRoute] int id)
        //{
        //    try
        //    {
        //        _services.UsersServices.Delete(id);
        //        return Created("", new object());
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}
