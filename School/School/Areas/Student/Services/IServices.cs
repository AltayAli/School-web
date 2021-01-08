using School.Areas.Student.ViewModels;
using School.Models;
using System.Collections.Generic;

namespace School.Areas.Student.Services
{
    public interface IServices
    {
        List<CalendarViewModel> GetCalendar();
        Dictionary<string, object> GetJournal();
        List<Lesson> GetLessonsList();
    }
}
