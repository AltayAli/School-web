﻿using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using School.Areas.Extensions;
using School.Areas.Teacher.Repositories;

namespace School.Areas.Teacher.Services
{
    public class GroupsService : IGroupsService
    {
        private readonly IRepository _repo;
        public GroupsService(IRepository repo)
        {
            _repo = repo;
        }

        public LoadResult GetGroupsListByTeacherId(DevxLoadOptions options, int teacherId)
        => DataSourceLoader.Load(_repo.GroupsRepo.GetGroupsList(teacherId), options);
    }
}
