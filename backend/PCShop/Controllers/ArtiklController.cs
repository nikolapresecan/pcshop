using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Model;
using PCShop.Controllers.RESTModel;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PCShop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Zaposlenik, Administrator")]
    public class ArtiklController : ControllerBase
    {
        private readonly IServiceArtikl _serviceArtikl;

        public ArtiklController(IServiceArtikl serviceArtikl)
        {
            _serviceArtikl = serviceArtikl;
        }

        [HttpGet("alldomain")]
        public IActionResult GetArtikls()
        {
            var artikli = _serviceArtikl.GetAllArtiklDomain();
            return Ok(artikli);
        }

        [HttpGet("artikl_id/{artiklId}")]
        public async Task<ArtiklDomain> GetArtiklId(int artiklId)
        {
            ArtiklDomain artiklDomain = await _serviceArtikl.GetArtiklByIdAsync(artiklId);
            return artiklDomain;
        }

        [HttpGet("allquantity")]
        public IActionResult GetArtikliByQuantity()
        {
            var artikli = _serviceArtikl.GetArtiklByQuantity();
            return Ok(artikli);
        }

        [HttpPost("add_artikl")]
        public async Task<IActionResult> AddArtikli([FromBody] ArtiklREST artiklREST)
        {
            try
            {
                ArtiklDomain artiklDomain = new ArtiklDomain();
                artiklDomain.Naziv = artiklREST.Naziv;
                artiklDomain.Opis = artiklREST.Opis;
                artiklDomain.Jmj = artiklREST.Jmj;
                artiklDomain.JedCijena = artiklREST.JedCijena;
                artiklDomain.Kolicina = artiklREST.Kolicina;
                artiklDomain.KategorijaId = artiklREST.KategorijaId;
                
                bool add_artikl = await _serviceArtikl.AddArtiklAsync(artiklDomain);
                if (add_artikl)
                {
                    return Ok("Artikl uspješno dodan");
                }
                else
                {
                    return Ok("Artikl nije uspješno dodan");
                }
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Došlo je do greške: {e.Message}");
            }
        }

        [HttpPost("edit_artikl")]
        public async Task<IActionResult> UpdateArtikli([FromBody] ArtiklREST artiklREST)
        {
            try
            {
                ArtiklDomain artiklDomain = new ArtiklDomain();
                artiklDomain.Id = artiklREST.Id;
                artiklDomain.Naziv = artiklREST.Naziv;
                artiklDomain.Opis = artiklREST.Opis;
                artiklDomain.Jmj = artiklREST.Jmj;
                artiklDomain.JedCijena = artiklREST.JedCijena;
                artiklDomain.Kolicina = artiklREST.Kolicina;

                bool update_artikl = await _serviceArtikl.UpdateArtiklAsync(artiklDomain);
                if (update_artikl)
                {
                    return Ok("Artikl uspješno ažuriran");
                }
                else
                {
                    return Ok("Artikl nije uspješno ažuriran");
                }
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Došlo je do greške: {e.Message}");
            }
        }

        [HttpPost("delete_artikl")]
        public async Task<IActionResult> DeleteArtikli([FromBody] ArtiklREST artiklREST)
        {
            try
            {
                ArtiklDomain artiklDomain = new ArtiklDomain();
                artiklDomain.Id = artiklREST.Id;

                bool delete_artikl = await _serviceArtikl.DeleteArtiklAsync(artiklDomain);
                if (delete_artikl)
                {
                    return Ok("Artikl uspješno obrisan");
                }
                else
                {
                    return Ok("Artikl nije uspješno obrisan");
                }
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Došlo je do greške: {e.Message}");
            }
        }

        [HttpGet("sorted")]
        public ActionResult<IEnumerable<ArtiklDomain>> GetArtikliSorted([FromQuery] string sortBy)
        {
            return Ok(_serviceArtikl.GetArtiklSorted(sortBy));
        }

        [HttpGet("filter")]
        public ActionResult<IEnumerable<ArtiklDomain>> GetArtikliByPriceRange([FromQuery] decimal minPrice, [FromQuery] decimal maxPrice)
        {
            return Ok(_serviceArtikl.GetArtiklByPriceRange(minPrice, maxPrice));
        }
    }
}
