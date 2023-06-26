using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Supplier;
using WebFilm.Core.Enitites.Unit;
using WebFilm.Core.Enitites.User;

namespace WebFilm.Core.Interfaces.Services
{
    public interface IUnitService : IBaseService<int, Units>
    {
        bool create(UnitDTO dto);

        bool update(int id, UnitDTO dto);
    }
}
