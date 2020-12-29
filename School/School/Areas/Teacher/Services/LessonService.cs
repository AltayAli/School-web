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
        public LoadResult GetList(DevxLoadOptions options,int groupId,int teacherId)
        => DataSourceLoader.Load(_repo.LessonsRepo.GetList(groupId, teacherId), options);


        public LessonViewModel Get(int id)
        {
            var model = _repo.LessonsRepo.Get(id);
            return new LessonViewModel
            {
                Name = model.Name,
                EndHour = model.EndDate.Hour,
                EndMinute = model.EndDate.Minute,
                FileName = model.File_Name,
                StartDate = model.StartDate,
                StartHour = model.StartDate.Hour,
                StartMinute = model.StartDate.Minute
            };
        }
        
        public void Create(LessonViewModel model)
        {
            var lessonId = _repo.LessonsRepo.Create(new Lesson { 
                StartDate = new DateTime(model.StartDate.Year,model.StartDate.Month,model.StartDate.Day,model.StartHour,model.StartMinute,0),
                EndDate = new DateTime(model.StartDate.Year, model.StartDate.Month, model.StartDate.Day, model.EndHour, model.EndMinute, 0),
                File_Name = model.FileName,
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
        public void Update(int lessonId,LessonViewModel model)
        {
            _repo.LessonsRepo.Update(lessonId, new Lesson
            {
                StartDate = new DateTime(model.StartDate.Year, model.StartDate.Month, model.StartDate.Day, model.StartHour, model.StartMinute, 0),
                EndDate = new DateTime(model.StartDate.Year, model.StartDate.Month, model.StartDate.Day, model.EndHour, model.EndMinute, 0),
                File_Name = model.FileName,
                Name = model.Name,
            });
        }

        public void Delete(int groupId, int teacherId,int lessonId)
        {
            _repo.LessonsRepo.Delete(lessonId);
            var gt = _repo.GroupTeachersRepo.GetGroupTeacherId(groupId, teacherId);
            var gtl = _repo.GroupTeacherLessonsRepo.Delete(gt, lessonId);
            var journalIds = _repo.GroupJournalsRepo.Delete(gtl);
            foreach (var id in journalIds)
            {
                _repo.JournalsRepo.Delete(id);
            }
        }

        public void EndLesson(int groupId, int teacherId)
        {
            throw new NotImplementedException();
        }

    }
}
