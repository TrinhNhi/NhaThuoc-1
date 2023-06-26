using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebFilm.Core.Enitites.Order
{
    public class Orders : BaseEntity
    {
        public int customerID { get; set; }
        public float price { get; set; }
        public bool isPack { get; set; } = false;
        public string? packer { get; set; }
    }
}
