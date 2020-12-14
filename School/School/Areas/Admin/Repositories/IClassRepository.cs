using School.Areas.Admin.ViewModels;
using School.Areas.Extensions;
using School.Models;
using System.Collections.Generic;

namespace School.Areas.Admin.Repositories
{
    public interface IClassRepository
    {
        List<GroupViewModel> GetDevextremeList(DevxLoadOptions options);
        Group Get();
        void Create(GroupOpModel model);
        void Update(int id, GroupOpModel model);
        void Delete(int id);
    }
}
