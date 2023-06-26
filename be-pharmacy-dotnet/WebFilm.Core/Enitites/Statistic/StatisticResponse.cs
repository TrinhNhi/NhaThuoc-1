using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebFilm.Core.Enitites.Statistic
{
    public class StatisticResponse
    {
        public BaseStatistic drug { get; set; }
        public BaseStatistic supplier { get; set; }
        public List<DrugOrderStatistic> drugOrder { get; set; }
        public int totalOrder { get; set; }
        public int totalPack { get; set; }

    }
}
