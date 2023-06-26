using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Statistic;
using WebFilm.Core.Enitites.Supplier;
using WebFilm.Core.Enitites.User;

namespace WebFilm.Core.Interfaces.Repository
{
    public interface ISupplierRepository : IBaseRepository<int, Suppliers>
    {
        BaseStatistic getStatistic();
    }
}
