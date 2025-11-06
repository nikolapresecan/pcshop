using DAL.DataModel;

namespace Model
{
    public class ArtiklDomain
    {
        public ArtiklDomain() { }

        public ArtiklDomain(Artikl artikl) { 
            Id = artikl.Id;
            Naziv = artikl.Naziv;
            Opis = artikl.Opis;
            Jmj = artikl.Jmj;
            JedCijena = artikl.JedCijena;
            Kolicina = artikl.Kolicina;
            if (artikl.kategorija != null)
            {
                Kategorija = artikl.kategorija.Naziv;
                KategorijaId = artikl.kategorija.Id;
            }
            else
            {
                Kategorija = "Nepoznata kategorija";
                KategorijaId = 0; 
            }
        }
        public int Id { get; set; }
        public string Naziv { get; set; }
        public string Opis { get; set; }
        public string Jmj { get; set; }
        public decimal JedCijena { get; set; }
        public int Kolicina { get; set; }
        public string Kategorija { get; set; }
        public int KategorijaId { get; set;}
    }
}
