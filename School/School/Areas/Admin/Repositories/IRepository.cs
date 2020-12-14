namespace School.Areas.Admin.Repositories
{
    public interface IRepository
    {
        IGroupsRepository GroupsRepo { get; }
        IGroupTeachersRepository GroupTeachersRepo { get; }
        int Complete();
    }
}
