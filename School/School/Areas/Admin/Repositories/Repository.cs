using School.Datas;

namespace School.Areas.Admin.Repositories
{
    public class Repository : IRepository
    {
        private readonly DataContext _context;
        public Repository(DataContext context)
        {
            _context = context;
        }
        public IGroupsRepository groupsRepository;
        public IGroupsRepository GroupsRepo
        {
            get
            {
                groupsRepository = new GroupsRepository(_context);
                return groupsRepository;
            }
        }

        public IGroupTeachersRepository groupTeachersRepository;
        public IGroupTeachersRepository GroupTeachersRepo
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
