using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebFilm.Core.Enitites.Customer
{
    public class Customers  : BaseEntity
    {
        public string name { get; set; }
        public string phone { get; set; }
    }
}
