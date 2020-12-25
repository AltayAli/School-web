using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Extensions;

namespace School.Areas.Teacher.Services
{
    public interface IGroupsService
    {
        LoadResult GetGroupsListByTeacherId(DevxLoadOptions options,int teacherId);
    }
}
