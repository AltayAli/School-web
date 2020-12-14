using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Admin.ViewModels;
using School.Areas.Extensions;
using School.Models;
using System.Collections.Generic;

namespace School.Areas.Admin.Repositories
{
    public interface IGroupTeachersRepository
    {
        LoadResult GetDevextremeList(DevxLoadOptions options);
        object Get(int id);
        void Create(GroupTeacher model);
        void Update(int id,GroupTeacher model);
        void Delete(int id);
    }
}
