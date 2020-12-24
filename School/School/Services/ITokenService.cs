using School.Enums;
using System.Threading.Tasks;

namespace School.Services
{
    public interface ITokenService
    {
        Task<string> GenerateToken(string name, string surname, string username, string photoPath, Roles role);
    }
}
