using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace DAL.DataModel
{
    public class ApplicationUser : IdentityUser
    {
        //dodatna svojstva koja idu u tablicu sa predefiniranim
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public DateTime? DatumRodenja { get; set; }
        public char Spol { get; set; }
        public string Adresa { get; set; }
        public string Grad { get; set; }
        public DateTime? DatumZaposlenja { get; set; }
        public ICollection<Racun> Racuni { get; set; } = new List<Racun>();
    }
}
