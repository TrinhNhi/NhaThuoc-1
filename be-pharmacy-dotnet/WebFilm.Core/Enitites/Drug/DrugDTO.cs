using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebFilm.Core.Enitites.Drug
{
    public class DrugDTO
    {
        public string? name { get; set; }
        public int qty { get; set; }
        public float price { get; set; }
        public float condition { get; set; }
        public string? image { get; set; }

        public DateTime? exp { get; set; }
        public int propertyID { get; set; }
        public int supplierID { get; set; }
        public bool isPrescription { get; set; }
    }
}
