using School.Models;

namespace School.Areas.Teacher.Repositories
{
    public interface IRepository
    {
        IBaseRepository<GroupJournal> GroupJournalsRepo { get; }
        IBaseRepository<GroupTeacherLesson> GroupTeacherLessonsRepo { get; }
        IBaseRepository<Journal> JournalsRepo { get; }
        ILessonRepository LessonsRepo { get; }
        IGroupsRepository GroupsRepo { get; }
        IUsersRepository UsersRepo { get; }
        IGroupTeachersRepository GroupTeachersRepo { get; }
    }
}
