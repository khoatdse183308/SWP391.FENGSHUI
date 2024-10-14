﻿using FengShuiKoi_BO;
using FengShuiKoi_Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KoiFengShui.BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LifePalaceDirectionController : ControllerBase
    {
        private readonly ILifePlaceDirectionService _lifePlaceDirectionService;
        public LifePalaceDirectionController(ILifePlaceDirectionService lifePlaceDirectionService)
        {
            _lifePlaceDirectionService = lifePlaceDirectionService;
        }
        [HttpGet("GetAllMansionsAndDes")]
        public IActionResult GetAllMansionsAndDes()
        {
            try
            {
                var sortedMansionsAndDescriptions = _lifePlaceDirectionService.GetEightMansionsAndDescriptions();

               
                var result = sortedMansionsAndDescriptions.Select(item => new
                {
                    EightMansions = item.EightMansions,
                    Description = item.Description
                }).ToList();

                

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
}