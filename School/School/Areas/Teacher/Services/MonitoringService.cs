using System;
using Microsoft.AspNetCore.Http;
using School.Areas.Teacher.ViewModels;
using School.Datas;
using School.Models;
using System.Collections.Generic;
using System.Linq;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using School.Areas.Extensions;

namespace School.Areas.Teacher.Services
{
    public class MonitoringService : IMonitoringService
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _accessor;
        public MonitoringService(DataContext context, IHttpContextAccessor accessor)
        {
            _accessor = accessor;
            _context = context;
        }

        public LoadResult GetLists(DevxLoadOptions options,int groupId)
        {
            var teacherId = _accessor.HttpContext.Session.GetInt32("id").Value;

            var vv = (from contextMonitoring in _context.Monitorings
                      where contextMonitoring.GroupId == groupId&&contextMonitoring.TeacherId == teacherId
                      group contextMonitoring by new {contextMonitoring.Name , contextMonitoring.DeadLine} into a
                      select new
                      {
                          a.Key.DeadLine,
                          a.Key.Name
                      }
                      );

            return DataSourceLoader.Load(vv,options);
        }

        public LoadResult GetUser(DevxLoadOptions options, string name, int groupId)
        {
            return DataSourceLoader.Load(_context.Monitorings.Where(x => x.Name == name &&
                                                                         x.TeacherId == _accessor.HttpContext.Session
                                                                             .GetInt32("id")
                                                                             .Value &&
                                                                         x.GroupId == groupId).Select(x=>new
            {
                x.Id,
                _context.Users.Select(y=>new {y.Id,StudentName =$"{y.Name} {y.Surname}"}).FirstOrDefault(y=>y.Id==x.StudentId).StudentName,
                x.Path,
                x.Score
            }), options);
        }

        public void Create(MonitoringViewModel model)
        {
            var teacherId = _accessor.HttpContext.Session.GetInt32("id").Value;

            var st = (from u in _context.Users
                where u.Id == teacherId
                join gt in _context.GroupTeachers
                    on u.Id equals gt.TeacherID
                join t in _context.Users
                    on gt.GroupID equals t.Class_Id
                      where t.Class_Id == model.GroupID
                select t).ToList();

            _context.Monitorings.AddRange(st.Select(x=>new Monitoring
            {
                DeadLine = model.DeadLine,
                Name = model.Name,
                StudentId = x.Id,
                TeacherId = teacherId,
                GroupId = x.Class_Id
            }));

            _context.SaveChanges();
        }

        public void Update(string oldName, MonitoringViewModel model)
        {
            var t = _accessor.HttpContext.Session.GetInt32("id").Value;
            var updated = _context.Monitorings.Where(x => x.Name == oldName &&
                                                          x.TeacherId == t&&
                                                          x.GroupId == model.GroupID);
            foreach (var monitoring in updated)
            {
                _context.Attach(monitoring);
                monitoring.DeadLine = model.DeadLine;
                monitoring.Name = model.Name;
            }

            _context.SaveChanges();

        }

        public void UpdateScore(int id, MonitoringViewModel model)
        {
            var updated = _context.Monitorings.FirstOrDefault(x => x.Id == id);
            _context.Attach(updated);

            if (updated.DeadLine>DateTime.Now||updated.Path==null)
            {
                throw new Exception("Dəyişməyə icazə yoxdur!");
            }

            updated.Score = model.Score;

            _context.SaveChanges();
        }

        public void Delete(string name,int groupId)
        {
            var updated = _context.Monitorings.Where(x => x.Name == name &&
                                                          x.TeacherId == _accessor.HttpContext.Session.GetInt32("id")
                                                              .Value &&
                                                          x.GroupId == groupId);
            _context.Monitorings.RemoveRange(updated);
            _context.SaveChanges();
        }
    }
}
