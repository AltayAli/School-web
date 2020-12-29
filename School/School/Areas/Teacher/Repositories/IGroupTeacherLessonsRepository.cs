using School.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School.Areas.Teacher.Repositories
{
    public interface IGroupTeacherLessonsRepository : IBaseRepository<GroupTeacherLesson>
    {
        int Delete(int grouTecherId, int lessonId);
    }
}
