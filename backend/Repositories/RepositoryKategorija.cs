using DAL.DataModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class RepositoryKategorija : IRepositoryKategorija
    {
        private readonly ShopDb _context;

        public RepositoryKategorija(ShopDb context)
        {
            _context = context;
        }

        public async Task<bool> AddAsync(Kategorija kategorija)
        {
            try
            {
                EntityEntry<Kategorija> newKategorija = await _context.Kategorija.AddAsync(kategorija);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
            
        }

        public IEnumerable<Kategorija> GetAll()
        {
            IEnumerable<Kategorija> kategorije = _context.Kategorija.ToList();
            return kategorije;
        }

        public Kategorija GetById(int kategorijaId)
        {
            return _context.Kategorija
                .Include(k => k.Artikli)
                .FirstOrDefault(k => k.Id == kategorijaId);
        }

        public int GetCountById(int kategorijaId)
        {
            return _context.Artikl.Count(a => a.KategorijaId == kategorijaId);
        }
    }
}
