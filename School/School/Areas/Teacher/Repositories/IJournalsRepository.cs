using School.Models;
using System.Collections.Generic;

namespace School.Areas.Teacher.Repositories
{
    public interface IJournalsRepository : IBaseRepository<Journal>
    {
        List<dynamic> GetJournal(int groupId, int teacherId);
    }
}
