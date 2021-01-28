using Microsoft.AspNetCore.Mvc;
using School.Services;
using School.ViewModels;
using System;

namespace School.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IMessageService _service;
        public MessagesController(IMessageService service)
        {
            _service = service;
        }

        [HttpGet("{userId}")]
        public IActionResult GetUserMessages(int userId)
        {
            try
            {
                return Ok(new
                {
                    Data = _service.GetUserMessages(userId)
                });
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public IActionResult GetUsersList()
        {
            try
            {
                return Ok(_service.GetUsers());
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Send(SendedMessageViewModel model)
        {
            try
            {
                _service.Create(model);
                return Ok(new { 
                    Date = DateTime.Now.ToString("dd.MM.yy HH:mm")
                });
            }
            catch (Exception ex)
            {
                return BadRequest("Mesaj göndərilmədi");
            }
        }
    }
}
