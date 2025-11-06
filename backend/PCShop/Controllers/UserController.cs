using DAL.DataModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using PCShop.Controllers.RESTModel;
using Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PCShop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IServiceUser _serviceUser;

        public UserController(IServiceUser serviceUser)
        {
            _serviceUser = serviceUser;
        }

        [HttpGet]
        [Route("users_db")]
        [Authorize(Roles = "Administrator")]
        public IEnumerable<ApplicationUser> GetUsersDB()
        {
            IEnumerable<ApplicationUser> userDB = _serviceUser.GetAllUsersDb();
            return userDB;
        }

        [HttpGet]
        [Route("users_domain")]
        [Authorize(Roles = "Administrator")]
        public IEnumerable<UserDomain> GetUsersDomain()
        {
            IEnumerable<UserDomain> userDomain = _serviceUser.GetAllUsersDomain();
            return userDomain;
        }

        [HttpGet]
        [Route("user_id/{userId}")]
        [Authorize(Roles = "Administrator, Zaposlenik")]
        public UserDomain GetUserIdDomain(string userId)
        {
            UserDomain userDomain = _serviceUser.GetUserDomainById(userId);
            return userDomain;
        }

        [HttpPost]
        [Route("edit")]
        [Authorize(Roles = "Administrator, Zaposlenik")]
        public async Task<IActionResult> UpdateUserAsync([FromBody] UserREST userREST)
        {
            try
            {
                UserDomain userDomain = new UserDomain();
                userDomain.Id = userREST.Id;
                userDomain.Ime = userREST.Ime;
                userDomain.Prezime = userREST.Prezime;
                userDomain.DatumRodenja = userREST.DatumRodenja;
                userDomain.Spol = userREST.Spol;
                userDomain.Adresa = userREST.Adresa;
                userDomain.Grad = userREST.Grad;
                userDomain.DatumZaposlenja = userREST.DatumZaposlenja;
                bool update_user = await _serviceUser.UpdateUserAsync(userDomain);
                if (update_user)
                {
                    return Ok("Zaposlenik ažuriran");
                }
                else
                {
                    return Ok("Zaposlenik nije ažuriran");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.ToString());
            }
        }

        [HttpPost]
        [Route("delete")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteUserAsync([FromBody] UserREST userREST)
        {
            try
            {
                UserDomain userDomain = new UserDomain();
                userDomain.Id = userREST.Id;
                bool delete_user = await _serviceUser.DeleteUserAsync(userDomain);
                if (delete_user)
                {
                    return Ok("Zaposlenik obrisan");
                }
                else
                {
                    return Ok("Zaposlenik nije obrisan");
                }
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.ToString());
            }
        }
    }
}
