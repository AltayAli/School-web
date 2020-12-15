using Microsoft.EntityFrameworkCore;
using School.Datas;
using School.Models;
using System;
using System.Linq;

namespace School.Areas.Admin.Repositories
{
    public class LessonsRepository : IBaseRepository<Lesson>
    {
        private readonly DataContext _context;
        public LessonsRepository(DataContext context)
        {
            _context = context;
        }

        public IQueryable GetList()
            => _context.Lessons;

        public object Get(int id)
            => _context.Lessons.FirstOrDefault(x => x.Id == id);

        public void Create(Lesson model)
            => _context.Lessons.Add(model);

        public void Update(int id, Lesson model)
        {
            if (!Exists(id))
                throw new Exception("Məlumat tapılmadı!");

            var updatedModel = _context.Lessons.FirstOrDefault(x => x.Id == id);
            _context.Entry(updatedModel).State = EntityState.Modified;
            updatedModel.Date = model.Date;
            updatedModel.File_Name = model.File_Name;
            updatedModel.Name = model.Name;
        }
        public void Delete(int id)
        {
            if (!Exists(id))
                throw new Exception("Məlumat tapılmadı!");

            _context.Lessons.Remove(_context.Lessons.FirstOrDefault(x => x.Id == id));
        }
        private bool Exists(int id)
            => _context.Lessons.Any(x => x.Id == id);
    }
}
