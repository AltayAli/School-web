using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using Microsoft.EntityFrameworkCore;
using School.Areas.Extensions;
using School.Datas;
using School.Models;
using System;
using System.Linq;


namespace School.Areas.Teacher.Repositories
{
    public class GroupTeacherLessonsRepository : IGroupTeacherLessonsRepository
    {
        private readonly DataContext _context;
        public GroupTeacherLessonsRepository(DataContext context)
        {
            _context = context;
        }
        public LoadResult GetDevextremeList(DevxLoadOptions options)
            => DataSourceLoader.Load(_context.GroupTeacherLessons, options);
        public GroupTeacherLesson Get(int id)
            => _context.GroupTeacherLessons.FirstOrDefault(x => x.Id == id);

        public int Create(GroupTeacherLesson model)
        { 
            _context.GroupTeacherLessons.Add(model);
            _context.SaveChanges();
            return model.Id;
        }
        

        public void Update(int id, GroupTeacherLesson model)
        {
            if (!Exists(id))
                throw new Exception("Məlumat tapılmadı!");

            var updatedModel = _context.GroupTeacherLessons.FirstOrDefault(x => x.Id == id);
            _context.Entry(updatedModel).State = EntityState.Modified;
            updatedModel.GroupTeacherId = model.GroupTeacherId;
            updatedModel.LessonId = model.LessonId;
            _context.SaveChanges();

        }

        public int Delete(int grouTecherId,int lessonId)
        {
            var model = _context.GroupTeacherLessons.FirstOrDefault(x => x.GroupTeacherId == grouTecherId && x.LessonId == lessonId);
            int id = model.Id;
            _context.GroupTeacherLessons
                            .Remove(model);
            _context.SaveChanges();

            return  id;
        }
        private bool Exists(int id)
            => _context.GroupTeacherLessons.Any(x => x.Id == id);

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
