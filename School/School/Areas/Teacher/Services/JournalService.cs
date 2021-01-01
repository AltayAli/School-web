using School.Areas.Extensions;
using School.Areas.Teacher.Models;
using School.Areas.Teacher.Repositories;
using School.Areas.Teacher.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace School.Areas.Teacher.Services
{
    public class JournalService : IJournalService
    {
        private readonly IRepository _repo;
        public JournalService(IRepository repo)
        {
            _repo = repo;
        }

        public Dictionary<string, object> GetJournal(DevxLoadOptions options,int groupId, int teacherId)
        {
            var jurnalList = _repo.JournalsRepo.GetJournal(options, groupId, teacherId).data.Cast<JournalViewModel>().ToList();
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

            if (students!=null)
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

        public void Update(int studentId, ScoreViewModel model)
        {
            MonthConvertor convertor = new MonthConvertor();
            string month = model.Date.Substring(2, 3);
            int day = int.Parse(model.Date.Substring(0, 2)), 
                year = int.Parse(model.Date.Substring(5,4)),
                hour = int.Parse(model.Date.Substring(9,2)),
                minute = int.Parse(model.Date.Substring(11));
            string dateFormat = "ddMMMyyyyHHmm";

            DateTime date = new DateTime(year, convertor[month], day,hour,minute,0);


            _repo.JournalsRepo.Update(studentId, date, model.Score);
        }
    }
}
