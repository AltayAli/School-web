using System;

namespace School.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public int MessageListId { get; set; }
        public int WriterId { get; set; }
        public bool IsViewed { get; set; }
    }
}
