using DAL.DataModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public interface IRepositoryRacun
    {
        Task<Racun> CreateAsync(Racun racun);
        Task<Racun> GetById(int racunId);
        Task<List<Racun>> GetForZaposlenik(string zaposlenikId);
    }
}
