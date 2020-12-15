using School.Models;

namespace School.Areas.Admin.Repositories
{
    public interface IRepository
    {
        IBaseRepository<Group> GroupsRepo { get; }
        IBaseRepository<GroupTeacher> GroupTeachersRepo { get; }
        int Complete();
    }
}
