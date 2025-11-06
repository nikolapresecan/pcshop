using DAL.DataModel;
using Microsoft.EntityFrameworkCore;
using Repositories.Maper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class RepositoryRacun : IRepositoryRacun
    {
        private readonly ShopDb _context;

        public RepositoryRacun(ShopDb context)
        {
            _context = context;
        }

        public async Task<Racun> CreateAsync(Racun racun)
        {
            _context.Racun.Add(racun);
            await _context.SaveChangesAsync();
            return racun;
        }

        public async Task<Racun> GetById(int racunId)
        {
            return await _context.Racun
            .Include(r => r.Stavke)
                .ThenInclude(s => s.Artikl)
            .FirstOrDefaultAsync(r => r.Id == racunId);
        }

        public async Task<List<Racun>> GetForZaposlenik(string zaposlenikId)
        {
            return await _context.Racun
            .Include(r => r.Stavke)
                .ThenInclude(s => s.Artikl)
            .Where(r => r.ZaposlenikId == zaposlenikId)
            .ToListAsync();
        }
    }
}
