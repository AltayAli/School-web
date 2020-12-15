using Microsoft.EntityFrameworkCore;
using School.Datas;
using School.Models;
using System;
using System.Linq;


namespace School.Areas.Admin.Repositories
{
    public class GroupTeacherLessonsRepository : IBaseRepository<GroupTeacherLesson>
    {
        private readonly DataContext _context;
        public GroupTeacherLessonsRepository(DataContext context)
        {
            _context = context;
        }
        public IQueryable GetList()
            => _context.GroupTeacherLessons;
        public object Get(int id)
            => _context.GroupTeacherLessons.FirstOrDefault(x => x.Id == id);

        public void Create(GroupTeacherLesson model)
            =>  _context.GroupTeacherLessons.Add(model);
        

        public void Update(int id, GroupTeacherLesson model)
        {
            if (!Exists(id))
                throw new Exception("Məlumat tapılmadı!");

            var updatedModel = _context.GroupTeacherLessons.FirstOrDefault(x => x.Id == id);
            _context.Entry(updatedModel).State = EntityState.Modified;
            updatedModel.GroupTeacherId = model.GroupTeacherId;
            updatedModel.LessonId = model.LessonId;

        }

        public void Delete(int id)
        {
            if (!Exists(id))
                throw new Exception("Məlumat tapılmadı!");

            _context.GroupTeacherLessons.Remove(_context.GroupTeacherLessons.FirstOrDefault(x => x.Id == id));
        }
        private bool Exists(int id)
            => _context.GroupTeacherLessons.Any(x => x.Id == id);
    }
}
