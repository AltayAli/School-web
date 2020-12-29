using School.Models;

namespace School.Areas.Teacher.Repositories
{
    public interface IRepository
    {
        IGroupJournalRepository GroupJournalsRepo { get; }
        IGroupTeacherLessonsRepository GroupTeacherLessonsRepo { get; }
        IJournalsRepository JournalsRepo { get; }
        ILessonRepository LessonsRepo { get; }
        IGroupsRepository GroupsRepo { get; }
        IUsersRepository UsersRepo { get; }
        IGroupTeachersRepository GroupTeachersRepo { get; }
    }
}
