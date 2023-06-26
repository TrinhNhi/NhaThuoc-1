using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Property;

namespace WebFilm.Core.Interfaces.Services
{
    public interface IPropertyService : IBaseService<int, Properties>
    {
        bool create(PropertyDTO dto);

        bool update(int id, PropertyDTO dto);
    }
}
