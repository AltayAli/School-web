using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using Microsoft.EntityFrameworkCore;
using School.Areas.Extensions;
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
        public LoadResult GetDevextremeList(DevxLoadOptions options)
            => DataSourceLoader.Load(_context.Journals, options);
        public Journal Get(int id)
            => _context.Journals.FirstOrDefault(x => x.Id == id);

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
