using School.ViewModels;
using System.Collections.Generic;

namespace School.Services
{
    public interface IMessageService
    {
        List<MessageListViewModel> GetList();
        void Create(SendedMessageViewModel model);
        void Delete(int id);
    }
}
