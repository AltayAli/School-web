using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using Microsoft.EntityFrameworkCore;
using School.Areas.Admin.ViewModels;
using School.Areas.Extensions;
using School.Datas;
using System;
using System.Linq;

namespace School.Areas.Admin.Repositories
{
    public class GroupsRepository : IGroupsRepository
    {
        private readonly DataContext _context;
        public GroupsRepository(DataContext context)
        {
            _context = context;
        }
        public LoadResult GetDevextremeList(DevxLoadOptions options)
        => DataSourceLoader.Load(_context.Groups, options);

        public object Get(int id)
        => _context.Groups.FirstOrDefault(x => x.Id==id);

        public void Create(GroupOpModel model)
        {
            if (_context.Groups.Any(entity => entity.Name == model.Name))
                 throw new Exception("Bu adda qrup artıq mövcuddur!");

            _context.Groups.Add(new Models.Group { Name=model.Name });
        }

        public void Update(int id, GroupOpModel model)
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
