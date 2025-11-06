using DAL.DataModel;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class UserDomain
    {
        public UserDomain() { }

        public UserDomain(ApplicationUser user, IdentityRole role)
        {
            Id = user.Id;
            Ime = user.Ime;
            Prezime = user.Prezime;
            DatumRodenja = user.DatumRodenja;
            Spol = user.Spol;
            Adresa = user.Adresa;
            Grad = user.Grad;
            DatumZaposlenja = user.DatumZaposlenja;
            Uloga = role.Name;
            Email = user.Email;
        }
        public string Id { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public DateTime? DatumRodenja { get; set; }
        public char Spol { get; set; }
        public string Adresa { get; set; }
        public string Grad { get; set; }
        public DateTime? DatumZaposlenja { get; set; }
        public string Uloga { get; set; }
        public string Email { get; set; }
    }
}
