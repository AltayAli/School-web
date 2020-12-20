using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using Microsoft.EntityFrameworkCore;
using School.Areas.Extensions;
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
        public LoadResult GetDevextremeList(DevxLoadOptions options)
            => DataSourceLoader.Load(_context.Users, options);

        public User Get(int id)
        => _context.Users.FirstOrDefault(x => x.Id == id);

        public int Create(User model)
        {
            model.UserName = GenerateUserName(model.Name, model.Surname,0);
            model.MustChangePass = true;
            _context.Users.Add(model);
            _context.SaveChanges();

            return model.Id;
        }

        public void Update(int id, User model)
        {
            if (!Exists(id))
                throw new Exception("User mövcud deyil!");

            var updatedModel = _context.Users.FirstOrDefault(x => x.Id == id);
            _context.Entry(updatedModel).State = EntityState.Modified;
            updatedModel.Class_Id = model.Class_Id;
            updatedModel.Surname = model.Surname;
            updatedModel.Name = model.Name;
            updatedModel.Password = model.Password.CreatePassword();
            updatedModel.PhotoURL = model.PhotoURL;
            updatedModel.Role = model.Role;
            updatedModel.UserName = GenerateUserName(model.Name, model.Surname,id);
            updatedModel.MustChangePass = true;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            if (!Exists(id))
                throw new Exception("User mövcud deyil!");

            var deletedModel = _context.Users.FirstOrDefault(x => x.Id == id);
            _context.Users.Remove(deletedModel);
            _context.SaveChanges();
        }
        private bool Exists(int id)
            => _context.Users.Any(entity => entity.Id == id);

        private string GenerateUserName(string name,string surname,int id)
        {
            string username = $"{name.ToLower()}.{surname.ToLower()}";
            string result = username;
            var counter = 0;

        Again:
            if (_context.Users.Any(x => x.UserName == result&&x.Id!=id))
            {
                result = $"{username}.{counter++}";
                goto Again;
            }
            return result;
        }

    }
}
