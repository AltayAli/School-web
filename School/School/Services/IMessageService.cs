using School.ViewModels;
using System.Collections.Generic;

namespace School.Services
{
    public interface IMessageService
    {
        List<MessageListViewModel> GetList();
        List<MessageViewModel> GetUserMessages(int id);
        List<UsersListViewModel> GetUsers();
        void Create(SendedMessageViewModel model);
        void Delete(int id);
    }
}
