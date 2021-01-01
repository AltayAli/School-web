using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Extensions;
using School.Areas.Teacher.ViewModels;
using School.Models;
using System;
using System.Collections.Generic;

namespace School.Areas.Teacher.Repositories
{
    public interface IJournalsRepository : IBaseRepository<Journal>
    {
        LoadResult GetJournal(DevxLoadOptions options,int groupId, int teacherId);
        void Update(int studentid, DateTime date, string price);
    }
}
