﻿using FengShuiKoi_BO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FengShuiKoi_Services
{
    public interface IColorService
    {
        Task<Color> GetColorById(string id);
        Task<List<Color>> GetColors();
        Task<bool> AddColor(Color color);
        Task<bool> DeleteColor(string id);
        Task<bool> UpdateColor(Color color);
    }
}