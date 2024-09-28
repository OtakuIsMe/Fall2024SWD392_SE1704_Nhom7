using BE.src.Domains.DTOs.Area;
using BE.src.Domains.Models;
using BE.src.Repositories;
using BE.src.Shared.Type;
using Microsoft.AspNetCore.Mvc;

namespace BE.src.Services
{
    public interface IAreaServ
    {
        Task<IActionResult> CreateArea(CreateAreaReqDTO data);
    }

    public class AreaServ : IAreaServ
    {
        private readonly IAreaRepo _areaRepo;

        public AreaServ(IAreaRepo areaRepo)
        {
            _areaRepo = areaRepo;
        }

        public async Task<IActionResult> CreateArea(CreateAreaReqDTO data)
        {
            try
            {
                var location = new Location
                {
                    Address = data.Address,
                    Longitude = data.Longitude,
                    Latitude = data.Latitude,
                };
                var isLocationCreated = await _areaRepo.CreateLocation(location);
                if (!isLocationCreated)
                {
                    return ErrorResp.BadRequest("Fail to create location");
                }
                else
                {
                    var area = new Area
                    {
                        Name = data.Name,
                        Description = data.Description,
                        Location = location,
                    };
                    var isAreaCreated = await _areaRepo.CreateArea(area);
                    if (!isAreaCreated)
                    {
                        return ErrorResp.BadRequest("Fail to create area");
                    }
                    else
                    {
                        // Missing add Image to firebase
                        return SuccessResp.Created("Create area success");
                    }
                }
            }
            catch (Exception ex) {
                return ErrorResp.BadRequest(ex.Message);
            }
        }
    }

}