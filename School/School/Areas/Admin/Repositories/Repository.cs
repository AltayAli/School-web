using School.Datas;
using School.Models;

namespace School.Areas.Admin.Repositories
{
    public class Repository : IRepository
    {
        private readonly DataContext _context;
        public Repository(DataContext context)
        {
            _context = context;
        }
        public IBaseRepository<Group> groupsRepository;
        public IBaseRepository<Group> GroupsRepo
        {
            get
            {
                groupsRepository = new GroupsRepository(_context);
                return groupsRepository;
            }
        }

        public IBaseRepository<GroupTeacher> groupTeachersRepository;
        public IBaseRepository<GroupTeacher> GroupTeachersRepo
        {
            get
            {
                groupTeachersRepository = new GroupTeachersRepository(_context);
                return groupTeachersRepository;
            }
        }

        public int Complete()
        => _context.SaveChanges();
    }
}
