using Model;
using Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ServiceArtikl : IServiceArtikl
    {
        private readonly IRepositoryArtikl _repositoryArtikl;

        public ServiceArtikl(IRepositoryArtikl repository)
        {
            _repositoryArtikl = repository;
        }

        public async Task<bool> AddArtiklAsync(ArtiklDomain artiklDomain)
        {
            return await _repositoryArtikl.AddAsync(artiklDomain);
        }

        public async Task<bool> DecreaseQuantityAsync(int artiklId, int kolicina)
        {
            return await _repositoryArtikl.DecreaseAsync(artiklId, kolicina);
        }

        public async Task<bool> DeleteArtiklAsync(ArtiklDomain artiklDomain)
        {
            return await _repositoryArtikl.DeleteAsync(artiklDomain);
        }

        public IEnumerable<ArtiklDomain> GetAllArtiklDomain()
        {
            return _repositoryArtikl.GetAll();
        }

        public async Task<ArtiklDomain> GetArtiklByIdAsync(int artiklId)
        {
            return await _repositoryArtikl.GetByIdAsync(artiklId);
        }

        public IEnumerable<ArtiklDomain> GetArtiklByPriceRange(decimal minPrice, decimal maxPrice)
        {
            return _repositoryArtikl.GetByPriceRange(minPrice, maxPrice);
        }

        public IEnumerable<ArtiklDomain> GetArtiklByQuantity()
        {
            return _repositoryArtikl.GetByQuantity();
        }

        public IEnumerable<ArtiklDomain> GetArtiklSorted(string sortBy)
        {
            return _repositoryArtikl.GetSorted(sortBy);
        }

        public async Task<bool> UpdateArtiklAsync(ArtiklDomain artiklDomain)
        {
            return await _repositoryArtikl.UpdateAsync(artiklDomain);
        }
    }
}
