using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Extensions;
using School.Areas.Teacher.Repositories;
using System.Collections.Generic;

namespace School.Areas.Teacher.Services
{
    public class JournalService : IJournalService
    {
        private readonly IRepository _repo;
        public JournalService(IRepository repo)
        {
            _repo = repo;
        }

        public List<dynamic> GetJournal(int groupId, int teacherId)
        => _repo.JournalsRepo.GetJournal(groupId, teacherId);
    }
}
