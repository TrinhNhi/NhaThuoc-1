using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Drug;
using WebFilm.Core.Enitites.Order;
using WebFilm.Core.Enitites.Statistic;

namespace WebFilm.Core.Interfaces.Repository
{
    public interface IOrderDrugRepository : IBaseRepository<int, OrderDrugs>
    {
        List<DrugOrderStatistic> GetStatistic();
    }
}
