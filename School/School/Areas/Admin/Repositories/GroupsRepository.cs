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
        public LoadResult GetStudentsCountForGroups(DevxLoadOptions options)
            => DataSourceLoader.Load((from gr in _context.Groups
                                      select new { 
                                        Id = gr.Id,
                                        GroupName = gr.Name,
                                        StudentsCount = _context.Users.Count(x=>x.Class_Id == gr.Id&&x.Role==Enums.Roles.Student)
                                      }), options);
        public object GetStudentsForGroupId(int groupId)
            => (from gr in _context.Groups where gr.Id == groupId
                select new 
                {
                    GroupId = gr.Id,
                    StudentsId = _context.Users.Where(x => x.Class_Id == gr.Id && x.Role == Enums.Roles.Student).Select(x => x.Id).ToArray()
                }).FirstOrDefault();
        public Models.Group Get(int id)
        => _context.Groups.FirstOrDefault(x => x.Id==id);

        public int Create(Models.Group model)
        {
            if (ExistsByName(model.Name))
                 throw new Exception("Bu adda qrup artıq mövcuddur!");

            _context.Groups.Add(new Models.Group { Name=model.Name });
            _context.SaveChanges();

            return model.Id;
        }

        public void Update(int id, Models.Group model)
        {
            if(!Exists(id))
                throw new Exception("Qrup artıq mövcud deyil!");

            if (ExistsByName(model.Name))
                throw new Exception("Bu adda qrup artıq mövcuddur!");

            var updatedModel = _context.Groups.FirstOrDefault(x => x.Id == id);
            _context.Entry(updatedModel).State = EntityState.Modified;
            updatedModel.Name = model.Name;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            if (!Exists(id))
                throw new Exception("Qrup artıq mövcud deyil!");

            var deletedModel = _context.Groups.FirstOrDefault(x => x.Id == id);
            _context.Groups.Remove(deletedModel);
            _context.SaveChanges();
        }
        private bool Exists(int id)
            => _context.Groups.Any(entity => entity.Id == id);
        private bool ExistsByName(string name)
            => _context.Groups.Any(entity => entity.Name == name);

    }
}
