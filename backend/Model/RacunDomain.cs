using DAL.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Model
{
    public class RacunDomain
    {
        public RacunDomain() { }

        public RacunDomain(Racun racun)
        {
            Id = racun.Id;
            ZaposlenikId = racun.ZaposlenikId;
            Iznos = racun.Iznos;
            DatumIzdavanja = racun.DatumIzdavanja;
            Stavke = racun.Stavke.Select(stavka => new StavkaDomain(stavka)).ToList();
        }

        public int Id { get; set; }
        public string ZaposlenikId { get; set; }
        public string Iznos { get; set; }
        public DateTime? DatumIzdavanja { get; set; }
        public List<StavkaDomain> Stavke { get; set; }
    }
}
