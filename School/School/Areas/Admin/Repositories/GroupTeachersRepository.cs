using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using Microsoft.EntityFrameworkCore;
using School.Areas.Extensions;
using School.Datas;
using School.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace School.Areas.Admin.Repositories
{
    public class GroupTeachersRepository : IGroupTeachersRepository
    {
        private readonly DataContext _context;
        public GroupTeachersRepository(DataContext context)
        {
            _context = context;
        }
        public LoadResult GetDevextremeList(DevxLoadOptions options)
         => DataSourceLoader.Load((
             from gt in _context.GroupTeachers
             join gr in _context.Groups
             on gt.GroupID equals gr.Id
             join t in _context.Users
             on gt.TeacherID equals t.Id 
             select new { 
                Id  = gt.Id,
                GroupName = gr.Name,
                TeacherName = t.Name,
             }),options);
        public object Get(int id)
        => _context.GroupTeachers.FirstOrDefault(x => x.Id == id);

        public void Create(GroupTeacher model)
        {
            _context.GroupTeachers.Add(model);
        }

        public void Update(int id, GroupTeacher model)
        {
            if (!Exists(id))
                throw new Exception("Məlumat tapılmadı!");

            var updatedModel = _context.GroupTeachers.FirstOrDefault(x => x.Id == id);
            _context.Entry(updatedModel).State = EntityState.Modified;
            updatedModel.TeacherID = model.TeacherID;
            updatedModel.GroupID = model.GroupID;

        }

        public void Delete(int id)
        {
            if (!Exists(id))
                throw new Exception("Məlumat tapılmadı!");

            _context.GroupTeachers.Remove(_context.GroupTeachers.FirstOrDefault(x => x.Id == id));
        }
        private bool Exists(int id)
            => _context.GroupTeachers.Any(x => x.Id == id);
    }
}
