using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Supplier;
using WebFilm.Core.Enitites.User;

namespace WebFilm.Core.Interfaces.Services
{
    public interface ISupplierService : IBaseService<int, Suppliers>
    {
        bool create(SupplierDTO dto);

        bool update (int id, SupplierDTO dto);

        bool action(int id);
    }
}
