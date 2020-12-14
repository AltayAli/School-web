using Microsoft.EntityFrameworkCore;
using School.Areas.Admin.ViewModels;
using School.Areas.Extensions;
using School.Datas;
using School.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace School.Areas.Admin.Repositories
{
    public class ClassRepository : IClassRepository
    {
        private readonly DataContext _context;
        public ClassRepository(DataContext context)
        {
            _context = context;
        }
        public List<GroupViewModel> GetDevextremeList(DevxLoadOptions options)
        {
            throw new NotImplementedException();
        }

        public Group Get()
        {
            throw new NotImplementedException();
        }

        public void Create(GroupOpModel model)
        {
            if (_context.Groups.Any(entity => entity.Name == model.Name))
                 throw new Exception("Bu adda qrup artıq mövcuddur!");

            _context.Groups.Add(new Group { Name=model.Name,TeacherId=model.TeacherId});
        }

        public void Update(int id, GroupOpModel model)
        {
            if(!Exists(id))
                throw new Exception("Bu adda qrup artıq mövcud deyil!");

            var updatedModel = _context.Groups.FirstOrDefault(x => x.Id == id);
            _context.Entry(updatedModel).State = EntityState.Modified;
            updatedModel.Name = model.Name;
            updatedModel.TeacherId = model.TeacherId;
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
