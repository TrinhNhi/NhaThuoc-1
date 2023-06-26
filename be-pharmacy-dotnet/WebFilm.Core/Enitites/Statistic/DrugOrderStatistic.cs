using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebFilm.Core.Enitites.Statistic
{
    public class DrugOrderStatistic
    {
        public int id {  get; set; }
        public string name { get; set; }
        public int sold { get; set; }
        public int qty { get; set; }
    }
}
