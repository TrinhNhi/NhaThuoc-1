using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebFilm.Core.Enitites.Property
{
    public class Properties : BaseEntity
    {
        public int? boxesPerBin { get; set; }
        public int? bottlesPerBin { get; set; }
        public int? packsPerBox { get; set; }
        public int? pillsPerPack { get; set; }
    }
}
