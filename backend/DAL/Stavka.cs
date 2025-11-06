using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.DataModel
{
    public class Stavka
    {
        public int Id { get; set; }
        public int RacunId { get; set; }
        public int ArtiklId { get; set; }
        public int Kolicina { get; set; }
        public decimal Ukupno { get; set; }
        public decimal JedCijena { get; set; }
        public Racun racun { get; set; }
        public Artikl Artikl { get; set; }
    }
}
