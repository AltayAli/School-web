using Microsoft.AspNetCore.Mvc;
using School.Services;

namespace School.ViewComponents
{
    public class MessageViewComponent : ViewComponent
    {
        private readonly IMessageService _service;
        public MessageViewComponent(IMessageService service)
        {
            _service = service;
        }

        public IViewComponentResult Invoke(int userId)
        {
            return View(_service.GetUserMessages(userId));
        }

    }
}
