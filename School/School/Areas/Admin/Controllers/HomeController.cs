﻿using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using Microsoft.AspNetCore.Mvc;
using School.Areas.Admin.Services;
using School.Areas.Extensions;

namespace School.Areas.Admin.Controllers
{

    [Area("Admin")]
    [Route("[area]/[controller]/{action=Index}")]
    public class HomeController : Controller
    {
        private readonly IServices _services;
        public HomeController(IServices services)
        {
            _services = services;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public LoadResult GetSummary(DevxLoadOptions options)
            => DataSourceLoader.Load(_services.GetSummary,options);
    }
}
