using Microsoft.EntityFrameworkCore;
using School.Datas;
using School.Extensions;
using School.Models;
using System;
using System.Linq;

namespace School.Areas.Admin.Repositories
{
    public class UsersRepository : IBaseRepository<User>
    {
        private readonly DataContext _context;
        public UsersRepository(DataContext context)
        {
            _context = context;
        }
        public IQueryable GetList()
        => _context.Users;

        public object Get(int id)
        => _context.Users.FirstOrDefault(x => x.Id == id);

        public void Create(User model)
        {
            if (_context.Users.Any(entity => entity.Name == model.Name))
                throw new Exception("Bu adda qrup artıq mövcuddur!");

            string username = $"{model.Name.ToLower()}.{model.Surname.ToLower()}";
            string result = username;
            Again:
            var counter = 0;
            if (_context.Users.Any(x => x.UserName == result))
            {
                result = $"{username}.{counter++}";
                goto Again;
            }


            _context.Users.Add(new User
            {
                Name = model.Name,
                Class_Id = model.Class_Id,
                Surname = model.Surname,
                Password = model.Password.CreatePassword(),
                PhotoURL = model.PhotoURL,
                Role_Id = model.Role_Id,
                UserName = result,
                MustChangePass = true,
            });
        }

        public void Update(int id, User model)
        {
            if (!Exists(id))
                throw new Exception("Bu adda qrup artıq mövcud deyil!");

            var updatedModel = _context.Users.FirstOrDefault(x => x.Id == id);
            _context.Entry(updatedModel).State = EntityState.Modified;
            updatedModel.Class_Id = model.Class_Id;
            updatedModel.Surname = model.Surname;
            updatedModel.Password = model.Password.CreatePassword();
            updatedModel.PhotoURL = model.PhotoURL;
            updatedModel.Role_Id = model.Role_Id;
            updatedModel.UserName = model.UserName;
            updatedModel.MustChangePass = true;
        }

        public void Delete(int id)
        {
            if (!Exists(id))
                throw new Exception("Bu adda qrup artıq mövcud deyil!");

            var deletedModel = _context.Users.FirstOrDefault(x => x.Id == id);
            _context.Users.Remove(deletedModel);
        }
        private bool Exists(int id)
            => _context.Users.Any(entity => entity.Id == id);

    }
}
