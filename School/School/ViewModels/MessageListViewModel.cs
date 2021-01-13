using School.Models;
using System.Collections.Generic;

namespace School.ViewModels
{
    public class MessageListViewModel
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string PhotoUrl { get; set; }
        public List<Message> Messages { get; set; }
    }
}
