﻿using DevExtreme.AspNet.Data.ResponseModel;
using Microsoft.AspNetCore.Mvc;
using School.Areas.Admin.Services;
using School.Areas.Admin.ViewModels;
using School.Areas.Extensions;
using System;

namespace School.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("[area]/[controller]/{action=Index}")]
    public class GroupStudentsController : Controller
    {
        private readonly IServices _services;
        public GroupStudentsController(IServices services)
        {
            _services = services;
        }
        public IActionResult Index()
        {
            return View();
        }
        public LoadResult GetList(DevxLoadOptions options)
        => _services.GroupsService.GetStudentsCountForGroup(options);
        [HttpGet("{id}")]
        public IActionResult Update(int id)
        {
            return View(_services.GroupsService.GetStudentsForGroupId(id));
        }
        [HttpPost]
        public IActionResult Update([FromBody] GroupStudentViewModel model)
        {
            try
            {
                _services.UsersServices.SetStudentsToGroup(model);
                return Created("", new object());
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
