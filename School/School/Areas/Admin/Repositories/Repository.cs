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
        private IBaseRepository<Group> _groupsRepository;
        public IBaseRepository<Group> GroupsRepo
        {
            get
            {
                _groupsRepository ??= new GroupsRepository(_context);
                return _groupsRepository;
            }
        }

        private IBaseRepository<GroupTeacher> _groupTeachersRepository;
        public IBaseRepository<GroupTeacher> GroupTeachersRepo
        {
            get
            {
                _groupTeachersRepository ??= new GroupTeachersRepository(_context);
                return _groupTeachersRepository;
            }
        }

        private IBaseRepository<GroupJournal> _groupJournalsRepository;
        public IBaseRepository<GroupJournal> GroupJournalsRepo
        {
            get
            {
                _groupJournalsRepository ??= new GroupJournalsRepository(_context);
                return _groupJournalsRepository;
            }
        }

        private IBaseRepository<GroupTeacherLesson> _groupTeacherLessonsRepository;
        public IBaseRepository<GroupTeacherLesson> GroupTeacherLessonsRepo
        {
            get
            {
                _groupTeacherLessonsRepository ??= new GroupTeacherLessonsRepository(_context);
                return _groupTeacherLessonsRepository;
            }
        }

        private IBaseRepository<Journal> _journalsRepository;
        public IBaseRepository<Journal> JournalsRepo
        {
            get
            {
                _journalsRepository ??= new JournalsRepository(_context);
                return _journalsRepository;
            }
        }

        private IBaseRepository<Lesson> _lessonsRepository;
        public IBaseRepository<Lesson> LessonsRepo
        {
            get
            {
                _lessonsRepository ??= new LessonsRepository(_context);
                return _lessonsRepository;
            }
        }

        private IBaseRepository<User> _usersRepository;
        public IBaseRepository<User> UsersRepo
        {
            get
            {
                _usersRepository ??= new UsersRepository(_context);
                return _usersRepository;
            }
        }

    }
}
