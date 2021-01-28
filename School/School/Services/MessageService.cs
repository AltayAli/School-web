using Microsoft.AspNetCore.Http;
using School.Datas;
using School.Enums;
using School.Models;
using School.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace School.Services
{
    public class MessageService : IMessageService
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _accessor;
        public MessageService(DataContext context,
                                 IHttpContextAccessor accessor)
        {
            _context = context;
            _accessor = accessor;
        }
        public List<MessageListViewModel> GetList()
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == _accessor.HttpContext.Session.GetInt32("id").Value);

            if (user.Role==Roles.Student)
            {
                return (from u in _context.Users
                        where u.Id == user.Id
                        join ml in _context.MessagesLists
                                  on u.Id equals ml.StudentId
                                  join t in _context.Users
                                  on ml.TeacherId equals t.Id
                        select new MessageListViewModel
                                  {
                                      UserName = $"{t.Surname} {t.Name}",
                                      PhotoUrl = t.PhotoURL,
                                      UserId = ml.TeacherId,
                                      Messages = _context.Messages.Where(x=>x.MessageListId == ml.Id).ToList()
                        }).ToList();
                
            }else if(user.Role == Roles.Teacher)
            {
                var r = (from u in _context.Users
                         where u.Id == user.Id
                         join ml in _context.MessagesLists
                         on u.Id equals ml.TeacherId
                         join t in _context.Users
                         on ml.StudentId equals t.Id
                         select new MessageListViewModel
                         {
                             UserName = $"{t.Surname} {t.Name}",
                             PhotoUrl = t.PhotoURL,
                             UserId = ml.StudentId,
                             Messages = _context.Messages.Where(x => x.MessageListId == ml.Id).ToList()
                         }).ToList();
                return r;
            }
            else
            {
                return new List<MessageListViewModel>();
            }
        }
        public List<MessageViewModel> GetUserMessages(int id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == _accessor.HttpContext.Session.GetInt32("id").Value);

            if (user.Role == Roles.Student)
            {
                return (from u in _context.Users
                        where u.Id == user.Id
                        join ml in _context.MessagesLists
                        on u.Id equals ml.StudentId
                        join t in _context.Users
                        on ml.TeacherId equals t.Id
                        join m in _context.Messages
                        on ml.Id equals m.MessageListId
                        where ml.TeacherId == id
                        select new MessageViewModel
                        {
                            Content = m.Content,
                            Date = m.Date.ToString("dd.MM.yy HH:mm"),
                            WriterId = m.WriterId,
                            WrittenFullName = u.Name + ' ' + u.Surname,
                            WrittenPhoto = u.PhotoURL,
                        }).ToList();

            }
            else if (user.Role == Roles.Teacher)
            {
                var r = (from u in _context.Users
                         join ml in _context.MessagesLists
                         on u.Id equals ml.TeacherId
                         join t in _context.Users
                         on ml.StudentId equals t.Id
                         join m in _context.Messages
                         on ml.Id equals m.MessageListId where ml.StudentId == id && u.Id == user.Id
                         select new MessageViewModel
                         {
                             Content = m.Content,
                             Date = m.Date.ToString("dd.MM.yy HH:mm"),
                             WriterId = m.WriterId,
                             WrittenFullName = t.Name + ' ' + t.Surname,
                             WrittenPhoto = u.PhotoURL
                         }).ToList();
                return r;
            }
            else
            {
                return new List<MessageViewModel>();
            }
        }
        public void Create(SendedMessageViewModel model)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == _accessor.HttpContext.Session.GetInt32("id").Value);

            var id = 0;

            var messageList = new MessagesList
            {
                StudentId = user.Role == Roles.Student ? user.Id : model.To,
                TeacherId = user.Role == Roles.Teacher ? user.Id : model.To
            };

            if (!_context.MessagesLists.Any(x=>x.StudentId == messageList.StudentId&&x.TeacherId == messageList.TeacherId))
            {
                _context.MessagesLists.Add(messageList);
                _context.SaveChanges();
                id = messageList.Id;
            }
            else
            {
                id = _context.MessagesLists.FirstOrDefault(x => x.StudentId == messageList.StudentId && x.TeacherId == messageList.TeacherId).Id;
            }

            _context.Messages.Add(new Message
            {
                Content = model.Content,
                Date = DateTime.Now,
                MessageListId = id,
                WriterId = user.Id
            });

            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public List<UsersListViewModel> GetUsers()
        {

            var user = _context.Users.FirstOrDefault(x => x.Id == _accessor.HttpContext.Session.GetInt32("id").Value);

            if (user.Role == Roles.Student)
            {
                return (from u in _context.Users
                        where u.Id == user.Id
                        join g in _context.Groups
                        on u.Class_Id equals g.Id
                        join gt in _context.GroupTeachers
                        on g.Id equals gt.GroupID
                        join t in _context.Users
                        on gt.TeacherID equals t.Id
                        select new UsersListViewModel
                        {
                            Id = t.Id,
                            FullName = t.Name + ' '+ t.Surname,
                            Photo = t.PhotoURL
                        }).ToList();
            }else if(user.Role == Roles.Teacher)
            {
                return (from u in _context.Users
                        where u.Id == user.Id
                        join gt in _context.GroupTeachers
                        on u.Id equals gt.TeacherID
                        join t in _context.Users
                        on gt.GroupID equals t.Class_Id
                        select new UsersListViewModel
                        {
                            Id = t.Id,
                            FullName = t.Name + ' ' + t.Surname,
                            Photo = t.PhotoURL
                        }).ToList();
            }
            return new List<UsersListViewModel>();
        }
    }
}
