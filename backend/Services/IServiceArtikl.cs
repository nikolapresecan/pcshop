using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IServiceArtikl
    {
        IEnumerable<ArtiklDomain> GetAllArtiklDomain();
        Task<ArtiklDomain> GetArtiklByIdAsync(int artiklId);
        IEnumerable<ArtiklDomain> GetArtiklByQuantity();
        Task<bool> AddArtiklAsync(ArtiklDomain artiklDomain);
        Task<bool> UpdateArtiklAsync(ArtiklDomain artiklDomain);
        Task<bool> DeleteArtiklAsync(ArtiklDomain artiklDomain);
        Task<bool> DecreaseQuantityAsync(int artiklId, int kolicina);
        public IEnumerable<ArtiklDomain> GetArtiklSorted(string sortBy);
        public IEnumerable<ArtiklDomain> GetArtiklByPriceRange(decimal minPrice, decimal maxPrice);
    }
}
