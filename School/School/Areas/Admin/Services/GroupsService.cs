using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Admin.Repositories;
using School.Areas.Admin.ViewModels;
using School.Areas.Extensions;

namespace School.Areas.Admin.Services
{
    public class GroupsService : IGroupsService
    {
        private readonly IRepository _repo;
        public GroupsService(IRepository repo)
        {
            _repo = repo;
        }

        public LoadResult GetDevextremeList(DevxLoadOptions options)
        => _repo.GroupsRepo.GetDevextremeList(options);

        public LoadResult GetStudentsCountForGroup(DevxLoadOptions options)
        => _repo.GroupsRepo.GetStudentsCountForGroups(options);
        public object GetStudentsForGroupId(int groupId)
        => _repo.GroupsRepo.GetStudentsForGroupId(groupId);
        public void Create(GroupViewModel model)
        {
            _repo.GroupsRepo.Create(new Models.Group { Name = model.Name });
        }

        public void Update(int id, GroupViewModel model)
        {
            _repo.GroupsRepo.Update(id,new Models.Group { Name = model.Name });
            
        }

        public void Delete(int id)
        {
            _repo.GroupsRepo.Delete(id);
            
        }

    }
}
