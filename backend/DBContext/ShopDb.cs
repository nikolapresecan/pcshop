using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL.DataModel
{
    public class ShopDb : IdentityDbContext<ApplicationUser>
    {
        public ShopDb() { }
        public ShopDb(DbContextOptions<ShopDb> options) : base(options) { }
        public DbSet<Kategorija> Kategorija { get; set; } = null!;
        public DbSet<Artikl> Artikl { get; set; } = null!;
        public DbSet<Racun> Racun { get; set; } = null!;
        public DbSet<Stavka> Stavka { get; set; } = null!;
    }
}
