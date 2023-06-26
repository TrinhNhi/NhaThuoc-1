using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Property;
using WebFilm.Core.Enitites.Supplier;

namespace WebFilm.Core.Enitites.Drug
{
    public class DrugResponse
    {
        public int id { get; set; }
        public string? name { get; set; }
        public int qty { get; set; }
        public float price { get; set; }
        public float condition { get; set; }
        public string status { get; set; } = "OK";
        public string? image { get; set; }
        public bool isPrescription { get; set; }
        public DateTime? exp { get; set; }
        public Suppliers supplier { get; set; }
        public Properties property { get; set; }
    }
}
