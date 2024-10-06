﻿using FengShuiKoi_BO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FengShuiKoi_Services
{
    public interface IAdsPackageService
    {
        public AdsPackage GetAdsPackageByAdIDRank(string AdID, string Rank);

        public List<AdsPackage> GetListAdsPackageByAdIDRank(string AdID, string Rank);

        public List<AdsPackage> GetAdsPackages();
        public bool AddAdsPackage(AdsPackage ads);
        public bool UpdateAdsPackage(string AdID, string Rank);
        public bool DeleteAdsPackage(string AdID, string Rank);
    }
}
