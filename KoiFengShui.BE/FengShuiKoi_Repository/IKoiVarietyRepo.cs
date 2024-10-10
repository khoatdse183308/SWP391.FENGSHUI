﻿using FengShuiKoi_BO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FengShuiKoi_Repository
{
    public interface IKoiVarietyRepo
    {
        public KoiVariety GetKoiVarietyByType(string type);

        public List<KoiVariety> GetKoiVarieties();

        public List<KoiVariety> GetKoiVarietiesByElemnet(string element);

        public bool AddKoiVariety(KoiVariety variety);

        public bool DeleteKoiVariety(string type);

        public bool UpdateKoiVariety(KoiVariety updatedKoi);
      
    }
}
