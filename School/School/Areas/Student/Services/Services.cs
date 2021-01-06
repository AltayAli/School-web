using Microsoft.AspNetCore.Http;
using School.Areas.Student.ViewModels;
using School.Datas;
using System.Collections.Generic;
using System.Linq;

namespace School.Areas.Student.Services
{
    public class Services : IServices
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _accessor;
        public Services(DataContext context,
                            IHttpContextAccessor accessor)
        {
            _context = context;
            _accessor = accessor;
        }
        public List<CalendarViewModel> GetCalendar()
        => (from j in _context.Journals
            join u in _context.Users
            on j.Student_Id equals u.Id
            where u.Role == Enums.Roles.Student && u.Id == _accessor.HttpContext.Session.GetInt32("id")
            join gj in _context.GroupJournals
            on j.Id equals gj.JournalID
            join gtl in _context.GroupTeacherLessons
            on gj.GroupTeacherLessonId equals gtl.Id
            join gt in _context.GroupTeachers
            on gtl.GroupTeacherId equals gt.Id
            join l in _context.Lessons
            on gtl.LessonId equals l.Id
            select new CalendarViewModel
            {
                Text = l.Name,
                StartDate = l.StartDate,
                EndDate = l.EndDate
            }).ToList();
     }
}
