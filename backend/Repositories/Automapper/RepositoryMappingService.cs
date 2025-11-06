using AutoMapper;
using DAL.DataModel;
using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repositories.Maper
{
    public class RepositoryMappingService : IRepositoryMappingService
    {
        public Mapper mapper;

        public RepositoryMappingService()
        {
            var config = new MapperConfiguration(
                cfg =>
                {
                    cfg.CreateMap<Artikl, ArtiklDomain>()
                        .ForMember(dest => dest.Kategorija, opt => opt.MapFrom(src => src.kategorija.Naziv)); 
                    cfg.CreateMap<ArtiklDomain, Artikl>()
                        .ForMember(dest => dest.kategorija, opt => opt.Ignore())
                        .ForMember(dest => dest.KategorijaId, opt => opt.Ignore());
                    cfg.CreateMap<Kategorija, KategorijaDomain>();
                    cfg.CreateMap<KategorijaDomain, Kategorija>();
                    cfg.CreateMap<ApplicationUser, UserDomain>();
                    cfg.CreateMap<UserDomain, ApplicationUser>();
                    cfg.CreateMap<Racun, RacunDomain>();
                    cfg.CreateMap<RacunDomain, Racun>();
                    cfg.CreateMap<Stavka, StavkaDomain>();
                    cfg.CreateMap<StavkaDomain, Stavka>();
                });
            mapper = new Mapper(config);
        }
        public TDestination Map<TDestination>(object source)
        {
            return mapper.Map<TDestination>(source);
        }
    }
}
