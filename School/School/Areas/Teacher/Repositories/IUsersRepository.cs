using System.Collections.Generic;

namespace School.Areas.Teacher.Repositories
{
    public interface IUsersRepository
    {
        List<int> GetStudentsIdList(int groupId);
    }
}
