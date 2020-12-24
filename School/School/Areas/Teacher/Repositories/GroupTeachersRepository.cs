using School.Datas;
using System.Linq;

namespace School.Areas.Teacher.Repositories
{
    public class GroupTeachersRepository : IGroupTeachersRepository
    {
        private readonly DataContext _context;
        public GroupTeachersRepository(DataContext context)
        {
            _context = context;
        }
        public int GetGroupTeacherId(int groupId, int techerId)
        => _context.GroupTeachers.FirstOrDefault(x => x.GroupID == groupId && x.TeacherID == techerId).Id;
    }
}
