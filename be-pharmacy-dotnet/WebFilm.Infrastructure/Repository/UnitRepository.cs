using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Supplier;
using WebFilm.Core.Enitites.Unit;
using WebFilm.Core.Interfaces.Repository;

namespace WebFilm.Infrastructure.Repository
{
    public class UnitRepository : BaseRepository<int, Units>, IUnitRepository
    {
        public UnitRepository(IConfiguration configuration) : base(configuration)
        {
        }
    }
}
