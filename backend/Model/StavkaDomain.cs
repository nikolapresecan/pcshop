using DAL.DataModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class StavkaDomain
    {
        public StavkaDomain() { }

        public StavkaDomain(Stavka stavka)
        {
            Id = stavka.Id;
            RacunId = stavka.RacunId;
            ArtiklId = stavka.ArtiklId;
            Kolicina = stavka.Kolicina;
            Ukupno = stavka.Ukupno;
            JedCijena = stavka.JedCijena;
            Artikl = new ArtiklDomain(stavka.Artikl);
        }

        public int Id { get; set; }
        public int RacunId { get; set; }
        public int ArtiklId { get; set; }
        public int Kolicina { get; set; }
        public decimal Ukupno { get; set; }
        public decimal JedCijena { get; set; }
        public ArtiklDomain Artikl { get; set; }
    }
}
