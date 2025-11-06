namespace PCShop.Controllers.RESTModel
{
    public class ArtiklREST
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public string Opis { get; set; }
        public string Jmj { get; set; }
        public decimal JedCijena { get; set; }
        public int Kolicina { get; set; }
        public int KategorijaId { get; set; }
    }
}
