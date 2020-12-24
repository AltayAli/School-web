using School.Datas;
using System.Collections.Generic;
using System.Linq;

namespace School.Areas.Teacher.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly DataContext _context;
        public UsersRepository(DataContext context)
        {
            _context = context;
        }
        public List<int> GetStudentsIdList(int groupId)
        => _context.Users.Where(x => x.Class_Id == groupId && x.Role == Enums.Roles.Student)
                            .Select(x=>x.Id)
                            .ToList();
    }
}
