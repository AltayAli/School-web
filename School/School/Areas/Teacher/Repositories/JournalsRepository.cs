using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using Microsoft.EntityFrameworkCore;
using School.Areas.Extensions;
using School.Areas.Teacher.ViewModels;
using School.Datas;
using School.Models;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;

namespace School.Areas.Teacher.Repositories
{
    public class JournalsRepository : IJournalsRepository
    {
        private readonly DataContext _context;
        public JournalsRepository(DataContext context)
        {
            _context = context;
        }
        public LoadResult GetDevextremeList(DevxLoadOptions options)
            => DataSourceLoader.Load(_context.Journals, options);
        public Journal Get(int id)
            => _context.Journals.FirstOrDefault(x => x.Id == id);

        public LoadResult GetJournal(DevxLoadOptions options, int groupId, int teacherId)
        => DataSourceLoader.Load((from j in _context.Journals
                                 join u in _context.Users
                                 on j.Student_Id equals u.Id
                                 where u.Role == Enums.Roles.Student
                                 join gj in _context.GroupJournals
                                 on j.Id equals gj.JournalID
                                 join gtl in _context.GroupTeacherLessons
                                 on gj.GroupTeacherLessonId equals gtl.Id
                                 join gt in _context.GroupTeachers
                                 on gtl.GroupTeacherId equals gt.Id
                                 where gt.GroupID == groupId && gt.TeacherID == teacherId
                                 select new JournalViewModel
                                 {
                                     Date = j.Date,
                                     Id = j.Student_Id,
                                     Score = j.Score,
                                     Name = u.Name,
                                     Surname = u.Surname
                                 }).ToList(), options);

        public int Create(Journal model)
        {
            _context.Journals.Add(model);
            _context.SaveChanges();
            return model.Id;
        }


        public void Update(int id, Journal model)
        {
            if (!Exists(id))
                throw new Exception("Məlumat tapılmadı!");

            var updatedModel = _context.Journals.FirstOrDefault(x => x.Id == id);
            _context.Entry(updatedModel).State = EntityState.Modified;
            updatedModel.Date = model.Date;
            updatedModel.Score = model.Score;
            updatedModel.Student_Id = model.Student_Id;
            _context.SaveChanges();

        }

        public void Delete(int id)
        {
            if (!Exists(id))
                throw new Exception("Məlumat tapılmadı!");

            _context.Journals.Remove(_context.Journals.FirstOrDefault(x => x.Id == id));
            _context.SaveChanges();
        }
        private bool Exists(int id)
            => _context.Journals.Any(x => x.Id == id);
    }
}
