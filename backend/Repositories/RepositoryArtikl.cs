using DAL.DataModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Model;
using Repositories.Maper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class RepositoryArtikl : IRepositoryArtikl
    {
        private readonly ShopDb _context;
        private readonly IRepositoryMappingService _mappingService;

        public RepositoryArtikl(ShopDb context, IRepositoryMappingService mappingService)
        {
            _context = context;
            _mappingService = mappingService;
        }

        public async Task<bool> AddAsync(ArtiklDomain artiklDomain)
        {
            try
            {
                var artikl = _mappingService.Map<Artikl>(artiklDomain);

                var kategorija = await _context.Kategorija.FirstOrDefaultAsync(k => k.Id == artiklDomain.KategorijaId);
                if (kategorija == null)
                {
                    throw new Exception($"Kategorija s ID-om '{artiklDomain.KategorijaId}' nije pronađena.");
                }

                artikl.KategorijaId = kategorija.Id;

                EntityEntry<Artikl> artikl_created = await _context.Artikl.AddAsync(artikl);
                await _context.SaveChangesAsync();
                return true;

            }
            catch (Exception ex)
            {
                throw new Exception($"Došlo je do greške prilikom dodavanja artikla: {ex.Message}");
            }
        }

        public async Task<bool> DecreaseAsync(int artiklId, int kolicina)
        {
            Artikl artikl = _context.Artikl.Find(artiklId);
            if(artikl == null || artikl.Kolicina < kolicina)
            {
                return false;
            }

            artikl.Kolicina -= kolicina;

            _context.Artikl.Update(artikl);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(ArtiklDomain artiklDomain)
        {
            try
            {
                Artikl artikl = _context.Artikl.Find(artiklDomain.Id);
                if(artikl != null)
                {
                    _context.Artikl.Remove(artikl);
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

        public IEnumerable<ArtiklDomain> GetAll()
        {
            return _context.Artikl
            .Select(a => new ArtiklDomain
            {
                Id = a.Id,
                Naziv = a.Naziv,
                Opis = a.Opis,
                Jmj = a.Jmj,
                JedCijena = a.JedCijena,
                Kolicina = a.Kolicina,
                Kategorija = a.kategorija.Naziv
            })
            .ToList();
        }

        public IEnumerable<ArtiklDomain> GetByPriceRange(decimal minPrice, decimal maxPrice)
        {
            var artikli = GetByQuantity();
            return artikli.Where(a => a.JedCijena >= minPrice && a.JedCijena <= maxPrice).ToList();
        }

        public async Task<ArtiklDomain> GetByIdAsync(int artiklId)
        {
            Artikl artikl = await _context.Artikl.FindAsync(artiklId);
            if (artikl == null)
            {
                return null;
            }

            ArtiklDomain artiklDomain = _mappingService.Map<ArtiklDomain>(artikl);
            return artiklDomain;
        }

        public IEnumerable<ArtiklDomain> GetByQuantity()
        {
            return _context.Artikl
                .Where(a => a.Kolicina > 0)
                .Select(a => new ArtiklDomain
                {
                    Id = a.Id,
                    Naziv = a.Naziv,
                    Opis = a.Opis,
                    Jmj = a.Jmj,
                    JedCijena = a.JedCijena,
                    Kolicina = a.Kolicina,
                    Kategorija = a.kategorija.Naziv
                })
                .ToList();
        }

        public IEnumerable<ArtiklDomain> GetSorted(string sortBy)
        {
            var artikli = GetByQuantity();
            switch (sortBy)
            {
                case "name_asc":
                    return artikli.OrderBy(a => a.Naziv).ToList();
                case "name_desc":
                    return artikli.OrderByDescending(a => a.Naziv).ToList();
                case "price_asc":
                    return artikli.OrderBy(a => a.JedCijena).ToList();
                case "price_desc":
                    return artikli.OrderByDescending(a => a.JedCijena).ToList();
                default:
                    return artikli.ToList();
            }
        }

        public async Task<bool> UpdateAsync(ArtiklDomain artiklDomain)
        {
            try
            {
                Artikl artikl =_context.Artikl.Find(artiklDomain.Id);
                if (artikl != null)
                {
                    artikl.Naziv = artiklDomain.Naziv;
                    artikl.Opis = artiklDomain.Opis;
                    artikl.Jmj = artiklDomain.Jmj;
                    artikl.JedCijena = artiklDomain.JedCijena;
                    artikl.Kolicina = artiklDomain.Kolicina;
                    _context.Artikl.Update(artikl);
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
