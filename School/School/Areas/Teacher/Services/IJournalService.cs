using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School.Areas.Teacher.Services
{
    public interface IJournalService
    {
        List<dynamic> GetJournal(int groupId, int teacherId);
    }
}
