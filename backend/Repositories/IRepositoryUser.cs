using DAL.DataModel;
using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public interface IRepositoryUser
    {
        IEnumerable<ApplicationUser> GetAllDb();
        IEnumerable<UserDomain> GetAllDomain();
        UserDomain GetDomainById(string id);
        Task<bool> UpdateAsync(UserDomain user);
        Task<bool> DeleteAsync(UserDomain user);

    }
}
