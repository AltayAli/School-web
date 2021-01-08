using System.Collections.Generic;

namespace School.Areas.Admin.Services
{
    public interface IServices
    {
        IGroupsService GroupsService { get; }
        IUsersServices UsersServices { get; }
        IGroupTeachersService GroupTeachersService { get; }
        Dictionary<string, int> GetSummary { get; }
    }
}
