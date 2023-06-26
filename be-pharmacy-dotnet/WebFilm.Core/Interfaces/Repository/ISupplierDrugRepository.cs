using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Drug;

namespace WebFilm.Core.Interfaces.Repository
{
    public interface ISupplierDrugRepository : IBaseRepository<int, SupplierDrugs>
    {
        SupplierDrugs GetSupplierDrugs(int drugID);
    }
}
