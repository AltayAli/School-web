using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Admin.ViewModels;
using School.Areas.Extensions;

namespace School.Areas.Admin.Services
{
    public interface IGroupTeachersService
    {
        LoadResult GetDevextremeList(DevxLoadOptions options);
        void Create(GroupTeacherViewModel model);
        void Update(int id, GroupTeacherViewModel model);
        void Delete(int id);
    }
}
