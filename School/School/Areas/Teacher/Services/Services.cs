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
    }
}
