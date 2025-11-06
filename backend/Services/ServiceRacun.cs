using DAL.DataModel;
using Microsoft.EntityFrameworkCore;
using Model;
using Repositories;
using Repositories.Maper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ServiceRacun : IServiceRacun
    {
        private readonly IRepositoryRacun _repositoryRacun;
        private readonly IRepositoryArtikl _repositoryArtikl;
        private readonly IRepositoryMappingService _mappingService;
        private readonly IServiceArtikl _serviceArtikl;
        private readonly ShopDb _context;

        public ServiceRacun(IRepositoryRacun repositoryRacun, IRepositoryArtikl repositoryArtikl, IRepositoryMappingService mappingService, IServiceArtikl serviceArtikl, ShopDb context)
        {
            _repositoryRacun = repositoryRacun;
            _repositoryArtikl = repositoryArtikl;
            _mappingService = mappingService;
            _serviceArtikl = serviceArtikl;
            _context = context;
        }

        public async Task<int> CreateRacunAsync(RacunDomain racunDomain, List<StavkaDomain> stavke)
        {
            var stavkeZaRacun = new List<Stavka>();

            foreach (var stavkaDomain in stavke)
            {
                var artikl = await _context.Artikl.FindAsync(stavkaDomain.ArtiklId);
                if (artikl == null)
                {
                    throw new Exception($"Artikl sa ID {stavkaDomain.ArtiklId} nije pronađen.");
                }

                var ukupnaCijena = artikl.JedCijena * stavkaDomain.Kolicina;

                var stavka = new Stavka
                {
                    ArtiklId = stavkaDomain.ArtiklId,
                    Kolicina = stavkaDomain.Kolicina,
                    JedCijena = artikl.JedCijena,
                    Ukupno = ukupnaCijena,
                    Artikl = artikl
                };

                stavkeZaRacun.Add(stavka);
            }

            var racun = new Racun
            {
                ZaposlenikId = racunDomain.ZaposlenikId,
                DatumIzdavanja = DateTime.Now,
                Stavke = stavkeZaRacun
            };

            racun.Iznos = racun.Stavke.Sum(x => x.Ukupno).ToString();

            var noviRacun = await _repositoryRacun.CreateAsync(racun);

            foreach (var stavka in stavkeZaRacun)
            {
                await _serviceArtikl.DecreaseQuantityAsync(stavka.ArtiklId, stavka.Kolicina);
            }

            return noviRacun.Id;
        }

        public async Task<RacunDomain> GetRacunById(int racunId)
        {
            var racun = await _repositoryRacun.GetById(racunId);
            return racun != null ? new RacunDomain(racun) : null;
        }

        public async Task<List<RacunDomain>> GetRacuniForZaposlenik(string zaposlenikId)
        {
            var racuni = await _repositoryRacun.GetForZaposlenik(zaposlenikId);
            return racuni.Select(r => new RacunDomain(r)).ToList();
        }
    }
}
