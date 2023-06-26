using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebFilm.Core.Enitites.Order
{
    public class DrugsInfo
    {
        public int id { get; set; }
        public string name { get; set; }
        public float price { get; set; }
        public int qty { get; set; }
    }
}
