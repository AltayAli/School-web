using School.Areas.Admin.Repositories;

namespace School.Areas.Admin.Services
{
    public class Services : IServices
    {
        private readonly IRepository _repo;
        public Services(IRepository repo)
        {
            _repo = repo;
        }
        private IGroupsService _groupsService;
        public IGroupsService GroupsService
        {
            get
            {
                _groupsService ??= new GroupsService(_repo);
                return _groupsService;
            }
        }
        private IUsersServices _usersServices;
        public IUsersServices UsersServices
        {
            get
            {
                _usersServices ??= new UsersServices(_repo);
                return _usersServices;
            }
        }
    }
}
