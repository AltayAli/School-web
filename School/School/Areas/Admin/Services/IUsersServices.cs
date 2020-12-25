using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Admin.ViewModels;
using School.Areas.Extensions;
using System.Collections.Generic;

namespace School.Areas.Admin.Services
{
    public interface IUsersServices
    {
        LoadResult GetDevextremeList(DevxLoadOptions options);
        LoadResult GetTeachersList(DevxLoadOptions options);
        LoadResult GetAdminsList(DevxLoadOptions options);
        LoadResult GetStudentsList(DevxLoadOptions options);
        UserViewModel Get(int id);
        void SetStudentsToGroup(GroupStudentViewModel model);
        int Create(UserViewModel model);
        void Update(int id, UserViewModel model);
        void Delete(int id);
    }
}
