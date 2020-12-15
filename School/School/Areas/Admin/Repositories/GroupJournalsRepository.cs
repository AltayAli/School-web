using Microsoft.EntityFrameworkCore;
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
        
        public IQueryable GetList()
            => _context.GroupJournals;

        public object Get(int id)
            => _context.GroupJournals.FirstOrDefault(x => x.Id == id);

        public void Create(GroupJournal model)
            => _context.GroupJournals.Add(model);
        
        public void Update(int id, GroupJournal model)
        {
            if (!Exists(id))
                throw new Exception("Məlumat tapılmadı!");

            var updatedModel = _context.GroupJournals.FirstOrDefault(x => x.Id == id);
            _context.Entry(updatedModel).State = EntityState.Modified;
            updatedModel.GroupTeacherLessonId = model.GroupTeacherLessonId;
            updatedModel.JournalID = model.JournalID;
        }
        public void Delete(int id)
        {
            if (!Exists(id))
                throw new Exception("Məlumat tapılmadı!");

            _context.GroupJournals.Remove(_context.GroupJournals.FirstOrDefault(x => x.Id == id));
        }
        private bool Exists(int id)
            => _context.GroupJournals.Any(x => x.Id == id);
    }
}
