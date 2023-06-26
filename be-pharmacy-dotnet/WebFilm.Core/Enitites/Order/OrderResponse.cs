using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Customer;

namespace WebFilm.Core.Enitites.Order
{
    public class OrderResponse
    {
        public int id { get; set; }
        public float amount { get; set; }
        public bool isPack { get; set; }
        public string? packer { get; set; }
        public DateTime? createdDate { get; set; }
        public DateTime? modifiedDate { get; set; }
        public Customers customer { get; set; }
        public List<DrugsInfo> drugs { get; set; }

    }
}
