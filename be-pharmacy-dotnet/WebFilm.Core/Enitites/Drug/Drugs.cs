using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebFilm.Core.Enitites.Drug
{
    public class Drugs : BaseEntity
    {
        public string? name { get; set; }
        public int qty { get; set; }
        public float price { get; set; }
        public float condition { get; set; }
        public string status { get; set; } = "OK";
        public string? image { get; set; }
        public int propertyID { get; set; }
        public bool isPrescription { get; set; }

        public DateTime exp { get; set; }

    }
}
