using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Admin.ViewModels;
using School.Areas.Extensions;

namespace School.Areas.Admin.Repositories
{
    public interface IGroupsRepository
    {
        LoadResult GetDevextremeList(DevxLoadOptions options);
        object Get(int id);
        void Create(GroupOpModel model);
        void Update(int id, GroupOpModel model);
        void Delete(int id);
    }
}
