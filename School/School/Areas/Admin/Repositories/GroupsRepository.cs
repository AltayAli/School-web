using Microsoft.EntityFrameworkCore;
using School.Datas;
using School.Models;
using System;
using System.Linq;

namespace School.Areas.Admin.Repositories
{
    public class GroupsRepository : IBaseRepository<Group>
    {
        private readonly DataContext _context;
        public GroupsRepository(DataContext context)
        {
            _context = context;
        }
        public IQueryable GetList()
        => _context.Groups;

        public object Get(int id)
        => _context.Groups.FirstOrDefault(x => x.Id==id);

        public void Create(Group model)
        {
            if (_context.Groups.Any(entity => entity.Name == model.Name))
                 throw new Exception("Bu adda qrup artıq mövcuddur!");

            _context.Groups.Add(new Group { Name=model.Name });
        }

        public void Update(int id, Group model)
        {
            if(!Exists(id))
                throw new Exception("Bu adda qrup artıq mövcud deyil!");

            var updatedModel = _context.Groups.FirstOrDefault(x => x.Id == id);
            _context.Entry(updatedModel).State = EntityState.Modified;
            updatedModel.Name = model.Name;
        }

        public void Delete(int id)
        {
            if (!Exists(id))
                throw new Exception("Bu adda qrup artıq mövcud deyil!");

            var deletedModel = _context.Groups.FirstOrDefault(x => x.Id == id);
            _context.Groups.Remove(deletedModel);
        }
        private bool Exists(int id)
            => _context.Groups.Any(entity => entity.Id == id);

    }
}
