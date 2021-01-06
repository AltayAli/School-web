using School.Areas.Student.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School.Areas.Student.Services
{
    public interface IServices
    {
        List<CalendarViewModel> GetCalendar();
    }
}
