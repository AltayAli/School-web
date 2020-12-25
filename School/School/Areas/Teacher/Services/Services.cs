using School.Areas.Teacher.Repositories;

namespace School.Areas.Teacher.Services
{
    public class Services : IServices
    {
        private readonly IRepository _repo;
        public Services(IRepository repo)
        {
            _repo = repo;
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
    }
}
