using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Extensions;
using School.Areas.Teacher.ViewModels;

namespace School.Areas.Teacher.Services
{
    public interface IMonitoringService
    {
        LoadResult GetLists(DevxLoadOptions options, int groupId);
        LoadResult GetUser(DevxLoadOptions options, string name, int groupId);
        void Create(MonitoringViewModel model);
        void Update(string oldName, MonitoringViewModel model);
        void UpdateScore(int id, MonitoringViewModel model);
        void Delete(string name, int groupId);
    }
}
