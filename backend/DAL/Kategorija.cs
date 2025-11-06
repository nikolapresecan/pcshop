using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace DAL.DataModel
{
    public class Kategorija
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public ICollection<Artikl> Artikli { get; set; } = new List<Artikl>();
    }
}
