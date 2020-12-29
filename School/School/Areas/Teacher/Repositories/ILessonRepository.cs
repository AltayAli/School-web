using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Extensions;
using School.Models;
using System.Collections.Generic;

namespace School.Areas.Teacher.Repositories
{
    public interface ILessonRepository 
    {
        List<Lesson> GetList(int groupId, int teacherId);
        Lesson Get(int id);
        LoadResult GetDevextremeList(DevxLoadOptions options);
     
        int Create(Lesson model);
        void Update(int id, Lesson model);
        void Delete(int id);
    }
}
