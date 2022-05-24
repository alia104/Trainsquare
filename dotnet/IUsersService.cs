using Trainsquare.Models;
using Trainsquare.Models.Domain;

namespace Trainsquare.Services
{
    public interface IUsersService
    {
        Paged<User> Paginate(int pageIndex, int pageSize);
    }
}