using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IServiceRacun
    {
        Task<int> CreateRacunAsync(RacunDomain racunDomain, List<StavkaDomain> stavke);
        Task<RacunDomain> GetRacunById(int racunId);
        Task<List<RacunDomain>> GetRacuniForZaposlenik(string zaposlenikId);
    }
}
