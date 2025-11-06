using DAL.DataModel;
using Model;
using Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ServiceUser : IServiceUser
    {
        private readonly IRepositoryUser _repository;

        public ServiceUser(IRepositoryUser repository)
        {
            _repository = repository;
        }

        public async Task<bool> DeleteUserAsync(UserDomain user)
        {
            return await _repository.DeleteAsync(user);
        }

        public IEnumerable<ApplicationUser> GetAllUsersDb()
        {
            IEnumerable<ApplicationUser> userDb = _repository.GetAllDb();
            return userDb;
        }

        public IEnumerable<UserDomain> GetAllUsersDomain()
        {
            IEnumerable<UserDomain> userDomain = _repository.GetAllDomain();
            return userDomain;
        }

        public UserDomain GetUserDomainById(string id)
        {
            UserDomain userDomain = _repository.GetDomainById(id);
            return userDomain;
        }

        public async Task<bool> UpdateUserAsync(UserDomain user)
        {
            return await _repository.UpdateAsync(user);
        }
    }
}
