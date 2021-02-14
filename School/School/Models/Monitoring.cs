using System;

namespace School.Models
{
    public class Monitoring
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public string Score { get; set; }
        public DateTime DeadLine { get; set; }
        public int StudentId { get; set; }
        public int TeacherId { get; set; }
        public int GroupId { get; set; }
    }
}
