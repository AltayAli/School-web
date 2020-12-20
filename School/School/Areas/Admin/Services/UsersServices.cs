using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Admin.Repositories;
using School.Areas.Admin.ViewModels;
using School.Areas.Extensions;
using School.Models;

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
            Password = $"{model.Name}123",
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
    }
}
