using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Admin.ViewModels;
using School.Areas.Extensions;

namespace School.Areas.Admin.Services
{
    public interface IGroupsService
    {
        LoadResult GetDevextremeList(DevxLoadOptions options);
        void Create(GroupViewModel model);
        void Update(int id,GroupViewModel model);
        void Delete(int id);
    }
}
