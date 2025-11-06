using DAL.DataModel;
using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IServiceUser
    {
        IEnumerable<ApplicationUser> GetAllUsersDb();
        IEnumerable<UserDomain> GetAllUsersDomain();
        UserDomain GetUserDomainById(string id);
        Task<bool> UpdateUserAsync(UserDomain user);
        Task<bool> DeleteUserAsync(UserDomain user);
    }
}
