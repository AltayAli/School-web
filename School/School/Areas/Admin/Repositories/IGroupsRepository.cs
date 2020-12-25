using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Extensions;
using School.Models;

namespace School.Areas.Admin.Repositories
{
    public interface IGroupsRepository : IBaseRepository<Models.Group>
    {
        LoadResult GetStudentsCountForGroups(DevxLoadOptions options);
    }
}
