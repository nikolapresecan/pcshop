using DAL.DataModel;
using Microsoft.EntityFrameworkCore;
using Model;
using Repositories.Maper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class RepositoryUser : IRepositoryUser
    {
        private readonly ShopDb _context;
        private IRepositoryMappingService _mappingService;

        public RepositoryUser(ShopDb context, IRepositoryMappingService mappingService)
        {
            _context = context;
            _mappingService = mappingService;
        }

        public async Task<bool> DeleteAsync(UserDomain user)
        {
            try
            {
                var roles = await _context.UserRoles.Where(r => r.UserId == user.Id).ToListAsync();

                foreach (var role in roles)
                {
                    _context.UserRoles.Remove(role);
                }

                ApplicationUser userDb = _context.Users.Find(user.Id);
                if (userDb != null)
                {
                    _context.Users.Remove(userDb);
                    await _context.SaveChangesAsync();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public IEnumerable<ApplicationUser> GetAllDb()
        {
            IEnumerable<ApplicationUser> userDb = _context.Users.ToList();
            return userDb;
        }

        public IEnumerable<UserDomain> GetAllDomain()
        {
            var userDomain = _context.Users
            .Join(
                _context.UserRoles,
                user => user.Id,
                userRole => userRole.UserId,
                (user, userRole) => new { User = user, UserRole = userRole })
            .Join(
                _context.Roles,
                ur => ur.UserRole.RoleId,
                role => role.Id,
                (ur, role) => new UserDomain
                {
                    Id = ur.User.Id,
                    Ime = ur.User.Ime,
                    Prezime = ur.User.Prezime,
                    Uloga = role.Name
                })
            .ToList();

            return userDomain;
        }

        public UserDomain GetDomainById(string id)
        {
            ApplicationUser userDb = _context.Users.Find(id);
            UserDomain userDomain = _mappingService.Map<UserDomain>(userDb);
            return userDomain;
        }

        public async Task<bool> UpdateAsync(UserDomain user)
        {
            try
            {
                ApplicationUser userDb = _context.Users.Find(user.Id);
                if (userDb != null)
                {
                    userDb.Ime = user.Ime;
                    userDb.Prezime = user.Prezime;
                    userDb.DatumRodenja = user.DatumRodenja;
                    userDb.Spol = user.Spol;
                    userDb.Adresa = user.Adresa;
                    userDb.Grad = user.Grad;
                    userDb.DatumZaposlenja = user.DatumZaposlenja;
                    _context.Users.Update(userDb);
                    await _context.SaveChangesAsync();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
