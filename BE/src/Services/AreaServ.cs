using BE.src.Domains.DTOs.Area;
using BE.src.Domains.Models;
using BE.src.Repositories;
using BE.src.Shared.Type;
using BE.src.Util;
using Microsoft.AspNetCore.Mvc;

namespace BE.src.Services
{
    public interface IAreaServ
    {
        Task<IActionResult> CreateArea(CreateAreaRqDTO data);
    }

    public class AreaServ : IAreaServ
    {
        private readonly IAreaRepo _areaRepo;

        public AreaServ(IAreaRepo areaRepo)
        {
            _areaRepo = areaRepo;
        }

        public async Task<IActionResult> CreateArea(CreateAreaRqDTO data)
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
                        foreach (IFormFile image in data.Images)
                        {
                            string? urlFirebase = await Utils.UploadImgToFirebase(image, Utils.ConvertToUnderscore(data.Name), "Area");
                            if (urlFirebase == null)
                            {
                                return ErrorResp.BadRequest("Fail to save image to firebase");
                            }
                            var imageObj = new Image
                            {
                                Area = area,
                                Url = urlFirebase
                            };
                            var isImageCreated = await _areaRepo.AddImageArea(imageObj);
                            if (!isImageCreated)
                            {
                                return ErrorResp.BadRequest("Fail to save image to database");
                            }
                        }
                        return SuccessResp.Created("Create area success");
                    }
                }
            }
            catch (Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }
    }

}