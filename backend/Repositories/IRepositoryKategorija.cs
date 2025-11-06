using DAL.DataModel;
using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public interface IRepositoryKategorija
    {
        IEnumerable<Kategorija> GetAll();
        Kategorija GetById(int kategorijaId);
        public int GetCountById(int kategorijaId);
        Task<bool> AddAsync(Kategorija kategorija);
    }
}
