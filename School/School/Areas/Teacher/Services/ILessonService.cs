using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Extensions;
using School.Areas.Teacher.ViewModels;

namespace School.Areas.Teacher.Services
{
    public interface ILessonService
    {
        LoadResult GetList(DevxLoadOptions options, int grouId, int teacherId);
        void Create(LessonViewModel models);
        void Update(LessonViewModel models);
        void Delete(int groupId, int teacherId);
        void EndLesson(int groupId, int teacherId);
    }
}
