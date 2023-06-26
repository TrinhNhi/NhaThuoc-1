using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Drug;
using WebFilm.Core.Enitites.Order;

namespace WebFilm.Core.Interfaces.Repository
{
    public interface IOrderRepository : IBaseRepository<int, Orders>
    {
        Orders create(int customerID, float price);

        List<Orders> totalUnPack();
    }
}
