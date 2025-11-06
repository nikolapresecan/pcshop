using DAL.DataModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PCShop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KategorijaController : Controller
    {
        private readonly IServiceKategorija _serviceKategorija;

        public KategorijaController(IServiceKategorija serviceKategorija)
        {
            _serviceKategorija = serviceKategorija;
        }

        [HttpGet]
        [Route("kategorije_all")]
        [Authorize(Roles = "Administrator, Zaposlenik")]
        public IEnumerable<Kategorija> GetKategorije()
        {
            IEnumerable<Kategorija> kategorije = _serviceKategorija.GetAllKategorija();
            return kategorije;
        }

        [HttpPost]
        [Route("kategorije_add")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> AddKategorijaAsync([FromBody] Kategorija kategorija)
        {
            try
            {
                bool add_kategorija = await _serviceKategorija.AddKategorijaAsync(kategorija);
                if (add_kategorija)
                {
                    return Ok("Kategorija dodana");
                }
                else
                {
                    return Ok("Kategorija nije dodana");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.ToString());
            }
        }

        [HttpGet]
        [Route("kategorija_id/{kategorijaId}")]
        [Authorize(Roles = "Administrator, Zaposlenik")]
        public IActionResult GetArtikliByKategorijeId(int kategorijaId)
        {
            try
            {
                var kategorija = _serviceKategorija.GetKategorijaById(kategorijaId);

                if (kategorija == null)
                {
                    return NotFound($"Kategorija s ID-em {kategorijaId} nije pronađena.");
                }

                return Ok(new
                {
                    Artikli = kategorija.Artikli,
                    kategorija.ArtiklCount
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Došlo je do greške: {ex.Message}");
            }
        }
    }
}
