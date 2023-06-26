using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebFilm.Core.Enitites.Order
{
    public class OrderDTO
    {
        public int drugID { get; set; }
        public int qty { get; set; }
        public float price { get; set; }
    }
}
