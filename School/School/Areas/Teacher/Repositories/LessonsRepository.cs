﻿using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using Microsoft.EntityFrameworkCore;
using School.Areas.Extensions;
using School.Datas;
using School.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace School.Areas.Teacher.Repositories
{
    public class LessonsRepository : ILessonRepository
    {
        private readonly DataContext _context;
        public LessonsRepository(DataContext context)
        {
            _context = context;
        }

        public LoadResult GetDevextremeList(DevxLoadOptions options)
            => DataSourceLoader.Load(_context.Lessons, options);
        public Lesson Get(int id)
            => _context.Lessons.FirstOrDefault(x => x.Id==id);
        public List<Lesson> GetList(int groupId, int teacherId)
            => (from gtl in _context.GroupTeacherLessons
                join gt in _context.GroupTeachers
                on gtl.GroupTeacherId equals gt.Id
                where gt.GroupID == groupId && gt.TeacherID == teacherId
                join l in _context.Lessons
                on gtl.LessonId equals l.Id
                //join gj in _context.GroupJournals
                //on gtl.Id equals gj.GroupTeacherLessonId
                select l).ToList();
        public int Create(Lesson model)
        { 
            _context.Lessons.Add(model);
            _context.SaveChanges();
            return model.Id;
        }

        public void Update(int id, Lesson model)
        {
            if (!Exists(id))
                throw new Exception("Məlumat tapılmadı!");

            var updatedModel = _context.Lessons.FirstOrDefault(x => x.Id == id);
            _context.Entry(updatedModel).State = EntityState.Modified;
            updatedModel.StartDate = model.StartDate;
            updatedModel.EndDate = model.EndDate;
            updatedModel.File_Name = model.File_Name;
            updatedModel.Name = model.Name;
            _context.SaveChanges();
        }
        public void Delete(int id)
        {
            if (!Exists(id))
                throw new Exception("Məlumat tapılmadı!");

            _context.Lessons.Remove(_context.Lessons.FirstOrDefault(x => x.Id == id));
            _context.SaveChanges();
        }
        private bool Exists(int id)
            => _context.Lessons.Any(x => x.Id == id);

    }
}
