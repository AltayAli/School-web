using School.Datas;
using School.Models;

namespace School.Areas.Teacher.Repositories
{
    public class Repository : IRepository
    {
        private readonly DataContext _context;
        public Repository(DataContext context)
        {
            _context = context;
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

        private ILessonRepository _lessonsRepository;
        public ILessonRepository LessonsRepo
        {
            get
            {
                _lessonsRepository ??= new LessonsRepository(_context);
                return _lessonsRepository;
            }
        }

        private IUsersRepository _usersRepository;
        public IUsersRepository UsersRepo
        {
            get
            {
                _usersRepository ??= new UsersRepository(_context);
                return _usersRepository;
            }
        }
        private IGroupTeachersRepository _groupTeachersRepository;
        public IGroupTeachersRepository GroupTeachersRepo
        {
            get
            {
                _groupTeachersRepository ??= new GroupTeachersRepository(_context);
                return _groupTeachersRepository;
            }
        }
        private IGroupsRepository _groupsRepository;
        public IGroupsRepository GroupsRepo
        {
            get
            {
                _groupsRepository ??= new GroupsRepository(_context);
                return _groupsRepository;
            }
        }
    }
}
