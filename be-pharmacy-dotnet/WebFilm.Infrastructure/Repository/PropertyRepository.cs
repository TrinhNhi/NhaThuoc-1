using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Property;
using WebFilm.Core.Enitites.Supplier;
using WebFilm.Core.Interfaces.Repository;

namespace WebFilm.Infrastructure.Repository
{
    public class PropertyRepository : BaseRepository<int, Properties>, IPropertyRepository
    {
        public PropertyRepository(IConfiguration configuration) : base(configuration)
        {
        }
    }
}
