using Microsoft.EntityFrameworkCore;
using School.Datas;
using School.Models;
using System;
using System.Linq;

namespace School.Areas.Admin.Repositories
{
    public class JournalsRepository : IBaseRepository<Journal>
    {
        private readonly DataContext _context;
        public JournalsRepository(DataContext context)
        {
            _context = context;
        }
        public IQueryable GetList()
            => _context.Journals;
        public object Get(int id)
            => _context.Journals.FirstOrDefault(x => x.Id == id);

        public void Create(Journal model)
            => _context.Journals.Add(model);


        public void Update(int id, Journal model)
        {
            if (!Exists(id))
                throw new Exception("Məlumat tapılmadı!");

            var updatedModel = _context.Journals.FirstOrDefault(x => x.Id == id);
            _context.Entry(updatedModel).State = EntityState.Modified;
            updatedModel.Date = model.Date;
            updatedModel.Score = model.Score;
            updatedModel.Student_Id = model.Student_Id;

        }

        public void Delete(int id)
        {
            if (!Exists(id))
                throw new Exception("Məlumat tapılmadı!");

            _context.Journals.Remove(_context.Journals.FirstOrDefault(x => x.Id == id));
        }
        private bool Exists(int id)
            => _context.Journals.Any(x => x.Id == id);
    }
}
