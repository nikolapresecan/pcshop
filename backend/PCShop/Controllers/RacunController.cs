using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;
using System.Threading.Tasks;
using System;
using Model;
using Microsoft.Extensions.Logging;

namespace PCShop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Zaposlenik, Administrator")]
    public class RacunController : ControllerBase
    {
        private readonly IServiceRacun _serviceRacun;
        private readonly ILogger<RacunController> _logger;

        public RacunController(IServiceRacun serviceRacun, ILogger<RacunController> logger)
        {
            _serviceRacun = serviceRacun;
            _logger = logger;
        }

        [HttpPost("add_racun")]
        public async Task<IActionResult> KreirajRacun([FromBody] RacunDomain racunDomain)
        {
            try
            {
                var racunId = await _serviceRacun.CreateRacunAsync(racunDomain, racunDomain.Stavke);

                return Ok(new { Id = racunId });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Greška prilikom kreiranja računa: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, $"Greška prilikom kreiranja računa: {ex.Message}");
            }
        }

        [HttpGet("racun_id/{racunId}")]
        public async Task<IActionResult> GetRacun(int racunId)
        {
            try
            {
                var racun = await _serviceRacun.GetRacunById(racunId);
                if (racun == null)
                {
                    return NotFound($"Račun s ID-om {racunId} nije pronađen.");
                }
                return Ok(racun);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Greška prilikom pregleda računa: {ex.Message}");
            }
        }

        [HttpGet("zaposlenik_id/{zaposlenikId}")]
        public async Task<IActionResult> GetRacuniZaposlenika(string zaposlenikId)
        {
            try
            {
                var racuni = await _serviceRacun.GetRacuniForZaposlenik(zaposlenikId);
                if (racuni == null || racuni.Count == 0)
                {
                    return NotFound($"Nema računa za zaposlenika s ID-om {zaposlenikId}.");
                }
                return Ok(racuni);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Greška prilikom pregleda računa po zaposleniku: {ex.Message}");
            }
        }
    }
}
