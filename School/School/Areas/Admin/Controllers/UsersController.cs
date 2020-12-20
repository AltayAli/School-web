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
    public class UsersController : Controller
    {
        private readonly IServices _services;
        public UsersController(IServices services)
        {
            _services = services;
        }
        public IActionResult Index()
        {
            return View();
        }
        public LoadResult GetList(DevxLoadOptions options)
        => _services.UsersServices.GetDevextremeList(options);

        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Create([FromBody]UserViewModel model)
        {
            try
            {
                _services.UsersServices.Create(model);
                return Created("", new object());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{id}")]
        public IActionResult Update([FromRoute]int id)
        {
            return View(_services.UsersServices.Get(id));
        }
        [HttpPut("{id}")]
        public IActionResult Update([FromRoute] int id,[FromBody]UserViewModel model)
        {
            try
            {
                _services.UsersServices.Update(id,model);
                return Created("", new object());
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
                _services.UsersServices.Delete(id);
                return Created("", new object());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
