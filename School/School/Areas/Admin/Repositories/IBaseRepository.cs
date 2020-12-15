using System.Linq;

namespace School.Areas.Admin.Repositories
{
    public interface IBaseRepository<T> where T :class
    {
        IQueryable GetList();
        object Get(int id);
        void Create(T model);
        void Update(int id, T model);
        void Delete(int id);
    }
}
