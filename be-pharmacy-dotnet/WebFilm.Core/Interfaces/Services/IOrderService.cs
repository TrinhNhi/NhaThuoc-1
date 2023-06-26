using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Order;

namespace WebFilm.Core.Interfaces.Services
{
    public interface IOrderService : IBaseService<int, Orders>
    {
        bool create(OrderCreateDTO dto);

        List<OrderResponse> getAll();

        bool pack(int id);
    }
}
