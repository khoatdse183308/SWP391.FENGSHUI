﻿using FengShuiKoi_BO;
using FengShuiKoi_DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FengShuiKoi_Services
{
    public interface ITypeColorService
    {
        public List<TypeColor> GetAllType() ;



        public TypeColor GetPercentage(string color, string type);

        public List<TypeColor> GetTypeByColor(string color) ;
    }
}
