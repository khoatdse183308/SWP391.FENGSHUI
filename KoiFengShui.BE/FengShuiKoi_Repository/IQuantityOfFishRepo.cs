﻿using FengShuiKoi_BO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FengShuiKoi_Repository
{
    public interface IQuantityOfFishRepo
    {
        public QuantityOfFish getQuantityByElement(string element);
    }
}
