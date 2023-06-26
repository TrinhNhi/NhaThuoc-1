using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Drug;

namespace WebFilm.Core.Interfaces.Services
{
    public interface IDrugService : IBaseService<int, Drugs>
    {
        bool create(DrugDTO dto);
        bool update(int id, DrugDTO dto);
        bool action(int id);

        List<DrugResponse> search(string url);
    }
}
