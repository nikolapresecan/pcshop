using System;

namespace PCShop.Controllers.RESTModel
{
    public class UserREST
    {
        public string Id { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public DateTime? DatumRodenja { get; set; }
        public char Spol { get; set; }
        public string Adresa { get; set; }
        public string Grad { get; set; }
        public DateTime? DatumZaposlenja { get; set; }
    }
}
