using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using Microsoft.EntityFrameworkCore;
using School.Areas.Extensions;
using School.Datas;
using School.Models;
using System;
using System.Linq;

namespace School.Areas.Admin.Repositories
{
    public class GroupTeachersRepository : IBaseRepository<GroupTeacher>
    {
        private readonly DataContext _context;
        public GroupTeachersRepository(DataContext context)
        {
            _context = context;
        }
        public LoadResult GetDevextremeList(DevxLoadOptions options)
            => DataSourceLoader.Load(_context.GroupTeachers, options);
        public GroupTeacher Get(int id)
            => _context.GroupTeachers.FirstOrDefault(x => x.Id == id);

        public int Create(GroupTeacher model)
        {
            _context.GroupTeachers.Add(model);
            _context.SaveChanges();
            return model.Id;
        }
        

        public void Update(int id, GroupTeacher model)
        {
            if (!Exists(id))
                throw new Exception("Məlumat tapılmadı!");

            var updatedModel = _context.GroupTeachers.FirstOrDefault(x => x.Id == id);
            _context.Entry(updatedModel).State = EntityState.Modified;
            updatedModel.TeacherID = model.TeacherID;
            updatedModel.GroupID = model.GroupID;
            _context.SaveChanges();

        }

        public void Delete(int id)
        {
            if (!Exists(id))
                throw new Exception("Məlumat tapılmadı!");

            _context.GroupTeachers.Remove(_context.GroupTeachers.FirstOrDefault(x => x.Id == id));
            _context.SaveChanges();
        }
        private bool Exists(int id)
            => _context.GroupTeachers.Any(x => x.Id == id);
    }
}
