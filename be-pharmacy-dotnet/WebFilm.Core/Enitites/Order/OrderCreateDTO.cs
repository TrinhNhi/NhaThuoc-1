using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebFilm.Core.Enitites.Order
{
    public class OrderCreateDTO
    {
        public string name { get; set; }
        public string phone { get; set; }
        public List<OrderDTO> drugs { get; set; }
    }
}
