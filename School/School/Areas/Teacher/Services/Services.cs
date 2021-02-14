using Microsoft.AspNetCore.Http;
using School.Areas.Teacher.Repositories;
using School.Datas;

namespace School.Areas.Teacher.Services
{
    public class Services : IServices
    {
        private readonly IRepository _repo;
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _accessor;
        public Services(IRepository repo, DataContext context, IHttpContextAccessor accessor)
        {
            _repo = repo;
            _accessor = accessor;
            _context = context;
        }
        private ILessonService _lessonService;
        public ILessonService LessonService
        {
            get
            {
                _lessonService ??= new LessonService(_repo);
                return _lessonService;
            }
        }
        private IGroupsService _groupsService;
        public IGroupsService GroupsService
        {
            get
            {
                _groupsService ??= new GroupsService(_repo);
                return _groupsService;
            }
        }
        private IJournalService _journalService;
        public IJournalService JournalService
        {
            get
            {
                _journalService ??= new JournalService(_repo);
                return _journalService;
            }
        }

        private IMonitoringService _monitoringService;

        public IMonitoringService MonitoringService
        {
            get
            {
                _monitoringService ??= new MonitoringService(_context,_accessor);
                return _monitoringService;
            }
        }
    }
}
