namespace Repositories.Maper
{
    public interface IRepositoryMappingService
    {
        TDestination Map<TDestination>(object source);
    }
}
