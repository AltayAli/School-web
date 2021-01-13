using Microsoft.AspNetCore.Mvc;
using School.Services;
using System.Threading.Tasks;

namespace School.ViewComponents
{
    public class MessageListViewComponent : ViewComponent
    {
        private readonly IMessageService _service;
        public MessageListViewComponent(IMessageService service)
        {
            _service = service;
        }

        public IViewComponentResult Invoke()
        {
            return View(_service.GetList());
        }
        
    }
}
