using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class KategorijaDomain
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public List<ArtiklDomain> Artikli { get; set; }
        public int ArtiklCount { get; set; }
    }
}
