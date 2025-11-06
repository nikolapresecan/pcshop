using DAL.DataModel;
using Model;
using Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ServiceKategorija : IServiceKategorija
    {
        private readonly IRepositoryKategorija _repositoryKategorija;
        private readonly IRepositoryArtikl _repositoryArtikl;

        public ServiceKategorija(IRepositoryKategorija repositoryKategorija, IRepositoryArtikl repositoryArtikl)
        {
            _repositoryKategorija = repositoryKategorija;
            _repositoryArtikl = repositoryArtikl;
        }

        public async Task<bool> AddKategorijaAsync(Kategorija kategorija)
        {
            return await _repositoryKategorija.AddAsync(kategorija);
        }

        public IEnumerable<Kategorija> GetAllKategorija()
        {
            IEnumerable<Kategorija> kategorije = _repositoryKategorija.GetAll();
            return kategorije;
        }

        public KategorijaDomain GetKategorijaById(int kategorijaId)
        {
            var kategorijaEntity = _repositoryKategorija.GetById(kategorijaId);

            if (kategorijaEntity == null)
            {
                return null;
            }

            var artikli = _repositoryArtikl.GetByQuantity(); 

            var kategorijaDto = new KategorijaDomain
            {
                Id = kategorijaEntity.Id,
                Naziv = kategorijaEntity.Naziv,
                Artikli = artikli.Where(a => kategorijaEntity.Artikli.Any(ka => ka.Id == a.Id)).ToList(),
                ArtiklCount = _repositoryKategorija.GetCountById(kategorijaId)
            };

            return kategorijaDto;
        }


        public int GetArtiklCountByKategorijaId(int kategorijaId)
        {
            return _repositoryKategorija.GetCountById(kategorijaId);
        }
    }
}
