using School.Areas.Teacher.ViewModels;
using School.Datas;
using System.Collections.Generic;
using System.Linq;

namespace School.Areas.Teacher.Repositories
{
    public class GroupsRepository : IGroupsRepository
    {
        private readonly DataContext _context;
        public GroupsRepository(DataContext context)
        {
            _context = context;
        }
        public List<GroupViewModel> GetGroupsList(int teacherId)
        => (from grt in _context.GroupTeachers
            join gr in _context.Groups
            on grt.GroupID equals gr.Id
            join t in _context.Users
            on grt.TeacherID equals t.Id
            where t.Id == teacherId && t.Role == Enums.Roles.Teacher
            select new GroupViewModel
            {
                Id = gr.Id,
                Name = gr.Name,
                StudentCount = _context.Users.Count(x => x.Class_Id == gr.Id)
            }).ToList();
    }
}
