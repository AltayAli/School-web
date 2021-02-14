using System;

namespace School.Areas.Teacher.ViewModels
{
    public class MonitoringViewModel
    {
        public int GroupID { get; set; }
        public string Score { get; set; }
        public string Name { get; set; }
        public DateTime DeadLine { get; set; }
    }
}
