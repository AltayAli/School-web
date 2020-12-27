using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Admin.ViewModels;
using School.Areas.Extensions;

namespace School.Areas.Admin.Services
{
    public interface IGroupsService
    {
        LoadResult GetDevextremeList(DevxLoadOptions options);
        LoadResult GetStudentsCountForGroup(DevxLoadOptions options);
        object GetStudentsForGroupId(int groupId);
        void Create(GroupViewModel model);
        void Update(int id,GroupViewModel model);
        void Delete(int id);
    }
}
