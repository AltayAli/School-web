using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School.ViewModels
{
    public class MessageViewModel
    {
        public string Content { get; set; }
        public string Date { get; set; }
        public int WriterId { get; set; }
        public string WrittenFullName { get; set; }
        public string WrittenPhoto { get; set; }
        public bool IsViewed { get; set; }
    }
}
