using Microsoft.EntityFrameworkCore;
using School.Datas;
using School.Models;
using System;
using System.Linq;

namespace School.Areas.Admin.Repositories
{
    public class RolesRepository : IBaseRepository<Role>
    {
        private readonly DataContext _context;
        public RolesRepository(DataContext context)
        {
            _context = context;
        }
        public IQueryable GetList()
        => _context.Roles;

        public object Get(int id)
        => _context.Roles.FirstOrDefault(x => x.Id == id);

        public void Create(Role model)
        {
            if (_context.Roles.Any(entity => entity.Name == model.Name))
                throw new Exception("Bu adda qrup artıq mövcuddur!");

            _context.Roles.Add(new Role { Name = model.Name });
        }

        public void Update(int id, Role model)
        {
            if (!Exists(id))
                throw new Exception("Bu adda qrup artıq mövcud deyil!");

            var updatedModel = _context.Roles.FirstOrDefault(x => x.Id == id);
            _context.Entry(updatedModel).State = EntityState.Modified;
            updatedModel.Name = model.Name;
        }

        public void Delete(int id)
        {
            if (!Exists(id))
                throw new Exception("Bu adda qrup artıq mövcud deyil!");

            var deletedModel = _context.Roles.FirstOrDefault(x => x.Id == id);
            _context.Roles.Remove(deletedModel);
        }
        private bool Exists(int id)
            => _context.Roles.Any(entity => entity.Id == id);

    }
}
