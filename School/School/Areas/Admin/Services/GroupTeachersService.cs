using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Admin.Repositories;
using School.Areas.Admin.ViewModels;
using School.Areas.Extensions;
using School.Models;

namespace School.Areas.Admin.Services
{
    public class GroupTeachersService : IGroupTeachersService
    {
        private readonly IRepository _repo;
        public GroupTeachersService(IRepository repo)
        {
            _repo = repo;
        }
        public LoadResult GetDevextremeList(DevxLoadOptions options)
            => _repo.GroupTeachersRepo.GetDevextremeList(options);
        public void Create(GroupTeacherViewModel model)
        {
            _repo.GroupTeachersRepo.Create(new GroupTeacher { GroupID = model.GroupID, TeacherID = model.TeacherID });
        }

        public void Update(int id, GroupTeacherViewModel model)
        {
            _repo.GroupTeachersRepo.Update(id,new GroupTeacher { GroupID = model.GroupID, TeacherID = model.TeacherID });
        }

        public void Delete(int id)
        {
            _repo.GroupTeachersRepo.Delete(id);
        }
    }
}
