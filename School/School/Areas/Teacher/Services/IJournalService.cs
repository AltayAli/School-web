using School.Areas.Extensions;
using System.Collections.Generic;

namespace School.Areas.Teacher.Services
{
    public interface IJournalService
    {
        Dictionary<string, object> GetJournal(DevxLoadOptions options, int groupId, int teacherId);
    }
}
