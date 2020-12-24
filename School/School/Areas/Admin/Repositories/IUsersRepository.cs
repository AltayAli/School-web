using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Extensions;
using School.Models;

namespace School.Areas.Admin.Repositories
{
    public interface IUsersRepository : IBaseRepository<User>
    {
        LoadResult GetTeachersList(DevxLoadOptions options);
        LoadResult GetAdminsList(DevxLoadOptions options);
        LoadResult GetStudentsList(DevxLoadOptions options);
    }
}
