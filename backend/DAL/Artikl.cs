using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.DataModel
{
    public class Artikl
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public string Opis { get; set; }
        public string Jmj { get; set; }
        public decimal JedCijena { get; set; }
        public int Kolicina { get; set; }
        public int KategorijaId { get; set; }
        public Kategorija kategorija { get; set; }
    }
}
