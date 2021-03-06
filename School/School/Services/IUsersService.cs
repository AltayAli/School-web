﻿using School.ViewModels;

namespace School.Services
{
    public interface IUsersService
    {
        string IsOk(LoginViewModel model);
        string ChangePassword(PasswordChangeViewModel model);
        void DeleteSession();
        UserViewModel GetUser();
        void Update(UserViewModel model);
    }
}
