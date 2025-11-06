using DAL.DataModel;
using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public interface IRepositoryArtikl
    {
        IEnumerable<ArtiklDomain> GetAll();
        Task<ArtiklDomain> GetByIdAsync(int artiklId);
        IEnumerable<ArtiklDomain> GetByQuantity();
        Task<bool> AddAsync(ArtiklDomain artiklDomain);
        Task<bool> UpdateAsync(ArtiklDomain artiklDomain);
        Task<bool> DeleteAsync(ArtiklDomain artiklDomain);
        Task<bool> DecreaseAsync(int artiklId, int kolicina);
        public IEnumerable<ArtiklDomain> GetSorted(string sortBy);
        public IEnumerable<ArtiklDomain> GetByPriceRange(decimal minPrice, decimal maxPrice);
    }
}
