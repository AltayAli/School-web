using System;
using System.Text;

namespace School.Extensions
{
    public static class PasswordCreator
    {
        public static string CreatePassword(this string originalPassword)
        => Convert.ToBase64String(Encoding.UTF8.GetBytes(originalPassword));
    }
}
