using School.Areas.Extensions;
using School.Areas.Teacher.ViewModels;
using System.Collections.Generic;

namespace School.Areas.Teacher.Services
{
    public interface IJournalService
    {
        Dictionary<string, object> GetJournal(DevxLoadOptions options, int groupId, int teacherId);
        void Update(int studentId, ScoreViewModel model);
    }
}
