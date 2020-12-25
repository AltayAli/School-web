using School.Areas.Teacher.ViewModels;
using System.Collections.Generic;

namespace School.Areas.Teacher.Repositories
{
    public interface IGroupsRepository
    {
        List<GroupViewModel> GetGroupsList(int teacherId);
    }
}
