using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Extensions;
using System.Linq;

namespace School.Areas.Admin.Repositories
{
    public interface IBaseRepository<T> where T :class
    {
        LoadResult GetDevextremeList(DevxLoadOptions options);
        T Get(int id);
        int Create(T model);
        void Update(int id, T model);
        void Delete(int id);
    }
}
