using DAL.DataModel;
using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IServiceKategorija
    {
        IEnumerable<Kategorija> GetAllKategorija();
        KategorijaDomain GetKategorijaById(int kategorijaId);
        public int GetArtiklCountByKategorijaId(int kategorijaId);
        Task<bool> AddKategorijaAsync(Kategorija kategorija);
    }
}
