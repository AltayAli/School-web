using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School.Middlewares
{
    public class CheckSessionMiddleware
    {
        private readonly RequestDelegate _next;
        private const string _loginUrl = "/account/login";
        public CheckSessionMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public Task Invoke(HttpContext context)
        {
            try
            {
                var role = context.Session.GetString("role");
                bool mustChangePassword = Convert.ToBoolean(context.Session.GetString("must_change_password"));
                if (context.Request.Path!="/"&&context.Request.Path!=_loginUrl&& context.Request.Path != "/account/changepassword")
                {
                    if (role == null)
                        context.Response.Redirect(_loginUrl);
                    else
                    {
                        if (mustChangePassword)
                            context.Response.Redirect("/account/changepassword");
                        else
                        {
                            var area = context.Request.Path.Value.Substring(1, role == null ? 0 : role.Length);
                            if (area.ToLower() != role.ToLower())
                                context.Response.Redirect($"/{role.ToLower()}/home");
                        }
                    }
                }

            }
            catch (Exception)
            {
                context.Response.Redirect(_loginUrl);
            }

            return _next(context);
        }
    }
}
