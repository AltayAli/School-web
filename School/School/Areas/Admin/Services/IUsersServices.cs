using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Admin.ViewModels;
using School.Areas.Extensions;

namespace School.Areas.Admin.Services
{
    public interface IUsersServices
    {
        LoadResult GetDevextremeList(DevxLoadOptions options);
        UserViewModel Get(int id);
        int Create(UserViewModel model);
        void Update(int id, UserViewModel model);
        void Delete(int id);
    }
}
