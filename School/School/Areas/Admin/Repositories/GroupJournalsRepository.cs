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
    public class GroupJournalsRepository : IBaseRepository<GroupJournal>
    {
        private readonly DataContext _context;
        public GroupJournalsRepository(DataContext context)
        {
            _context = context;
        }

        public LoadResult GetDevextremeList(DevxLoadOptions options)
            => DataSourceLoader.Load(_context.GroupJournals, options);

        public GroupJournal Get(int id)
            => _context.GroupJournals.FirstOrDefault(x => x.Id == id);

        public int Create(GroupJournal model)
        {
            _context.GroupJournals.Add(model);
            _context.SaveChanges();
            return model.Id;
        }
        
        public void Update(int id, GroupJournal model)
        {
            if (!Exists(id))
                throw new Exception("Məlumat tapılmadı!");

            var updatedModel = _context.GroupJournals.FirstOrDefault(x => x.Id == id);
            _context.Entry(updatedModel).State = EntityState.Modified;
            updatedModel.GroupTeacherLessonId = model.GroupTeacherLessonId;
            updatedModel.JournalID = model.JournalID;
            _context.SaveChanges();
        }
        public void Delete(int id)
        {
            if (!Exists(id))
                throw new Exception("Məlumat tapılmadı!");

            _context.GroupJournals.Remove(_context.GroupJournals.FirstOrDefault(x => x.Id == id));
            _context.SaveChanges();
        }
        private bool Exists(int id)
            => _context.GroupJournals.Any(x => x.Id == id);
    }
}
