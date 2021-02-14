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
    public class MonitoringsController : Controller
    {
        private readonly IServices _services;
        public MonitoringsController(IServices services)
        {
            _services = services;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("{groupId}")]
        public LoadResult GetList(DevxLoadOptions options,[FromRoute] int groupId)
            => _services.MonitoringService.GetLists(options,groupId);
        [HttpGet]

        public LoadResult GetUsersList(DevxLoadOptions options, string name, int groupId)
            => _services.MonitoringService.GetUser(options,name,groupId);

        [HttpPost]
        public IActionResult Create([FromBody] MonitoringViewModel model)
        {
            try
            {
                _services.MonitoringService.Create(model);
                return Created("", new object());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{oldName}")]
        public IActionResult Update([FromRoute]string oldName,[FromBody] MonitoringViewModel model)
        {
            try
            {
                _services.MonitoringService.Update(oldName, model);
                return Created("", new object());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateScore([FromRoute]int id,[FromBody] MonitoringViewModel model)
        {
            try
            {
                _services.MonitoringService.UpdateScore(id, model);
                return Created("", new object());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public IActionResult Delete(string oldName, int groupId)
        {
            try
            {
                _services.MonitoringService.Delete(oldName, groupId);
                return Created("", new object());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
