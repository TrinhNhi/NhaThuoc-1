using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Drug;
using WebFilm.Core.Enitites.Statistic;

namespace WebFilm.Core.Interfaces.Repository
{
    public interface IDrugRepository : IBaseRepository<int, Drugs>
    {
        Drugs create(DrugDTO dto, int propertyID);

        int update(int id, DrugDTO dto);

        BaseStatistic getStatistic();
    }
}
