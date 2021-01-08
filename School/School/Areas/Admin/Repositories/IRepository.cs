using School.Models;
using System.Collections.Generic;

namespace School.Areas.Admin.Repositories
{
    public interface IRepository
    {
        IGroupsRepository GroupsRepo { get; }
        IBaseRepository<GroupTeacher> GroupTeachersRepo { get; }
        IBaseRepository<GroupJournal> GroupJournalsRepo { get; }
        IBaseRepository<GroupTeacherLesson> GroupTeacherLessonsRepo { get; }
        IBaseRepository<Journal> JournalsRepo { get; }
        IBaseRepository<Lesson> LessonsRepo { get; }
        IUsersRepository UsersRepo { get; }
        Dictionary<string, int> GetSummary { get; }
    }
}
