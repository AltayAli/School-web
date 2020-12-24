using DevExtreme.AspNet.Data.ResponseModel;
using Microsoft.AspNetCore.Mvc;
using School.Areas.Admin.Services;
using School.Areas.Admin.ViewModels;
using School.Areas.Extensions;
using System;


namespace School.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("[area]/[controller]/{action=Index}")]
    public class GroupTeachersController : Controller
    {
        private readonly IServices _services;
        public GroupTeachersController(IServices services)
        {
            _services = services;
        }
        public IActionResult Index()
        {
            return View();
        }
        public LoadResult GetList(DevxLoadOptions options)
        => _services.GroupTeachersService.GetDevextremeList(options);
        [HttpPost]
        public IActionResult Create([FromBody] GroupTeacherViewModel model)
        {
            try
            {
                _services.GroupTeachersService.Create(model);
                return Created("", new object());
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] GroupTeacherViewModel model)
        {
            try
            {
                _services.GroupTeachersService.Update(id, model);
                return Ok(new object());
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            try
            {
                _services.GroupTeachersService.Delete(id);
                return Ok(new object());
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
