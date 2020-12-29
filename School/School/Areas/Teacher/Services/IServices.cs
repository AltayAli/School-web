namespace School.Areas.Teacher.Services
{
    public interface IServices
    {
        ILessonService LessonService { get; }
        IGroupsService GroupsService { get; }
        IJournalService JournalService { get; }
    }
}
