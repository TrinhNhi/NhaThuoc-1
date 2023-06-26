using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Customer;
using WebFilm.Core.Enitites.Drug;

namespace WebFilm.Core.Interfaces.Repository
{
    public interface ICustomerRepository : IBaseRepository<int, Customers>
    {
        Customers create(string name, string phone);
    }
}
