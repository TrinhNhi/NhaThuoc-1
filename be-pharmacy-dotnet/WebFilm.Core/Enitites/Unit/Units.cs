﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebFilm.Core.Enitites.Unit
{
    public class Units : BaseEntity
    {
        public string? name { get; set; }

        public int parentID { get; set; }
    }
}
