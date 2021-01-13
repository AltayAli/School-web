using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Admin.Repositories;
using School.Areas.Admin.ViewModels;
using School.Areas.Extensions;
using School.Extensions;
using School.Models;
using System.Collections.Generic;
using System.Linq;

namespace School.Areas.Admin.Services
{
    public class UsersServices : IUsersServices
    {
        private readonly IRepository _repo;
        public UsersServices(IRepository repo)
        {
            _repo = repo;
        }

        public LoadResult GetDevextremeList(DevxLoadOptions options)
        => _repo.UsersRepo.GetDevextremeList(options);

        public LoadResult GetTeachersList(DevxLoadOptions options)
        => _repo.UsersRepo.GetTeachersList(options);

        public LoadResult GetAdminsList(DevxLoadOptions options)
        => _repo.UsersRepo.GetAdminsList(options);

        public LoadResult GetStudentsList(DevxLoadOptions options)
        => DataSourceLoader.Load(_repo.UsersRepo.GetStudentsList(),options);
        public UserViewModel Get(int id)
        {
            var model = _repo.UsersRepo.Get(id);
            return new UserViewModel
            {
                Name = model.Name,
                PhotoURL = model.PhotoURL,
                Role = model.Role,
                Surname = model.Surname
            };
        }
        public int Create(UserViewModel model)
        => _repo.UsersRepo.Create(new User
        {
            Name = model.Name,
            Password = $"{model.Name}123".CreatePassword(),
            PhotoURL = model.PhotoURL,
            Role = model.Role,
            Surname = model.Surname,
        });

        public void Update(int id, UserViewModel model)
        {
            _repo.UsersRepo.Update(id,new User
            {
                Name = model.Name,
                Password = $"{model.Name}123",
                PhotoURL = model.PhotoURL,
                Role = model.Role,
                Surname = model.Surname,
            });
            
        }
        public void Delete(int id)
        {
            _repo.UsersRepo.Delete(id);
            
        }

        public void SetStudentsToGroup(GroupStudentViewModel model)
        {
            var students = _repo.UsersRepo.GetStudentsList().Where(x=>x.Class_Id == model.GroupId && !model.StudentsId.Contains(x.Id));

            foreach(var student in students)
            {
                student.Class_Id = 0;
                _repo.UsersRepo.Update(student.Id, student);
            }

            foreach (var id in model.StudentsId)
            {
               var student = _repo.UsersRepo.Get(id);
                student.Class_Id = model.GroupId;
                _repo.UsersRepo.Update(id, student);
            }
        }
    }
}
