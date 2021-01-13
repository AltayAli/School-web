using Microsoft.AspNetCore.Http;
using School.Datas;
using School.Enums;
using School.Models;
using School.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
                                      Messages = _context.Messages.Where(x => x.MessageListId == ml.Id).ToList()
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
                             Messages = _context.Messages.Where(x => x.MessageListId == ml.Id).ToList()
                         }).ToList();
                return r;
            }
            else
            {
                return new List<MessageListViewModel>();
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

            if (_context.MessagesLists.Any(x=>x.StudentId == messageList.StudentId&&x.TeacherId == messageList.TeacherId))
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
                Content = model.Context,
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

    }
}
