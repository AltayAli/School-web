using School.Datas;
using School.Enums;
using School.Models;
using System.Collections.Generic;
using System.Linq;

namespace School.Areas.Admin.Repositories
{
    public class Repository : IRepository
    {
        private readonly DataContext _context;
        public Repository(DataContext context)
        {
            _context = context;
        }
        public Dictionary<string, int> GetSummary
        {
            get
            {
                Dictionary<string, int> summary = new Dictionary<string, int>();

                summary.Add("Qruplar", _context.Groups.Count());
                summary.Add("Adminlər", _context.Users.Where(x => x.Role == Roles.Admin).Count());
                summary.Add("Müəllimlər", _context.Users.Where(x => x.Role == Roles.Teacher).Count());
                summary.Add("Tələbələr", _context.Users.Where(x => x.Role == Roles.Student).Count());


                return summary;
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

        private IUsersRepository _usersRepository;
        public IUsersRepository UsersRepo
        {
            get
            {
                _usersRepository ??= new UsersRepository(_context);
                return _usersRepository;
            }
        }
    }
}
