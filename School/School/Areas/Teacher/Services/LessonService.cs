using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Extensions;
using School.Areas.Teacher.Repositories;
using School.Areas.Teacher.ViewModels;
using School.Models;
using System;

namespace School.Areas.Teacher.Services
{
    public class LessonService : ILessonService
    {
        private readonly IRepository _repo;
        public LessonService(IRepository repo)
        {
            _repo = repo;
        }
        public LoadResult GetList(DevxLoadOptions options,int grouId,int teacherId)
        => DataSourceLoader.Load(_repo.LessonsRepo.GetList(grouId, teacherId), options);
        public void Create(LessonViewModel model)
        {
            var lessonId = _repo.LessonsRepo.Create(new Lesson { 
                StartDate = model.StartDate,
                EndDate = model.EndDate,
                File_Name = model.File_Name,
                Name = model.Name,
            });

            var gtlId = _repo.GroupTeacherLessonsRepo.Create(new GroupTeacherLesson
            {
                GroupTeacherId = _repo.GroupTeachersRepo.GetGroupTeacherId(model.GroupId, model.TeacherId),
                IsEnded = false,
                LessonId = lessonId,
            });

            var stIds = _repo.UsersRepo.GetStudentsIdList(model.GroupId);
            foreach (var id in  stIds)
            {
               var journalId = _repo.JournalsRepo.Create(new Journal
                {
                    Date = model.StartDate,
                    Student_Id = id
                });

                _repo.GroupJournalsRepo.Create(new GroupJournal
                {
                    JournalID = journalId,
                    GroupTeacherLessonId = gtlId
                });
            }

        }

        public void Delete(int groupId, int teacherId)
        {
            throw new NotImplementedException();
        }

        public void EndLesson(int groupId, int teacherId)
        {
            throw new NotImplementedException();
        }

        public void Update(LessonViewModel models)
        {
            throw new NotImplementedException();
        }
    }
}
