using Microsoft.AspNetCore.Http;
using School.Areas.Student.ViewModels;
using School.Datas;
using School.Models;
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

        public Dictionary<string, object> GetJournal()
        {
            var jurnalList = (from j in _context.Journals
                              join u in _context.Users
                              on j.Student_Id equals u.Id
                              where u.Role == Enums.Roles.Student && u.Id == _accessor.HttpContext.Session.GetInt32("id")
                              join gj in _context.GroupJournals
                              on j.Id equals gj.JournalID
                              join gtl in _context.GroupTeacherLessons
                              on gj.GroupTeacherLessonId equals gtl.Id
                              join gt in _context.GroupTeachers
                              on gtl.GroupTeacherId equals gt.Id
                              select new 
                              {
                                  Date = j.Date,
                                  Id = j.Student_Id,
                                  Score = j.Score,
                                  Name = u.Name,
                                  Surname = u.Surname
                              }).ToList();
            var dates = jurnalList.Select(x => x.Date)?.GroupBy(x => x)?.OrderBy(x => x.Key)?.ToList();
            var students = jurnalList.Select(x => x.Id)?.GroupBy(x => x)?.OrderBy(x => x.Key)?.ToList();

            var result = new Dictionary<string, object>();
            var properties = new Dictionary<string, object>();
            List<dynamic> jurnals = new List<dynamic>();
            string dateFormat = "ddMMMyyyyHHmm";
            properties.Add("P1", "Id");
            properties.Add("P2", "Name");
            var index = 3;
            if (dates != null)
            {
                foreach (var item in dates)
                {
                    var key = $"P{index++}";
                    if (!properties.ContainsKey(key))
                    {
                        properties.Add(key, item.Key.ToString(dateFormat));
                    }
                }
            }

            if (students != null)
            {
                foreach (var student in students)
                {
                    var j = new Dictionary<string, object>();
                    var s = jurnalList.FirstOrDefault(x => x.Id == student.Key);
                    j.Add("Id", s.Id);
                    j.Add("Name", s.Surname + ' ' + s.Name);
                    if (dates != null)
                    {
                        foreach (var item in dates)
                        {
                            var key = item.Key.ToString(dateFormat);
                            if (!j.ContainsKey(key))
                            {
                                j.Add(key, jurnalList.FirstOrDefault(x => x.Date == item.Key && x.Id == student.Key)?.Score ?? "de");
                            }
                        }
                    }
                    jurnals.Add(j);
                }
            }

            result.Add("Properties", properties);
            result.Add("List", jurnals);

            return result;
        }

        public List<Lesson> GetLessonsList()
        => (from gtl in _context.GroupTeacherLessons
            join gt in _context.GroupTeachers
            on gtl.GroupTeacherId equals gt.Id
            join l in _context.Lessons
            on gtl.LessonId equals l.Id
            join u in _context.Users
            on gt.GroupID equals u.Class_Id
            where u.Role == Enums.Roles.Student && u.Id == _accessor.HttpContext.Session.GetInt32("id")
            select l).ToList();

        public void CreateMonitoring(MonitoringViewModel model)
        {
            //BUnu yazmalisan
        }
    }
}
