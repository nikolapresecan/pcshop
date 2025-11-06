using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.DataModel
{
    public class Racun
    {
        public int Id { get; set; }
        public string ZaposlenikId { get; set; }
        public string Iznos { get; set; }
        public DateTime? DatumIzdavanja { get; set; }
        public ApplicationUser zaposlenik { get; set; }
        public ICollection<Stavka> Stavke { get; set; } = new List<Stavka>();
    }
}
