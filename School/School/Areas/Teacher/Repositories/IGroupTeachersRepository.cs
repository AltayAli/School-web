namespace School.Areas.Teacher.Repositories
{
    public interface IGroupTeachersRepository
    {
        int GetGroupTeacherId(int groupId, int techerId);
    }
}
