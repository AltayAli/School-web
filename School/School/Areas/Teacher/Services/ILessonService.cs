using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Extensions;
using School.Areas.Teacher.ViewModels;
using School.Models;

namespace School.Areas.Teacher.Services
{
    public interface ILessonService
    {
        LoadResult GetList(DevxLoadOptions options, int grouId, int teacherId);
        LessonViewModel Get(int id);
        void Create(LessonViewModel models);
        void Update(int lessonId, LessonViewModel model);
        void Delete(int groupId, int teacherId, int lessonId);
        void EndLesson(int groupId, int teacherId);
    }
}
