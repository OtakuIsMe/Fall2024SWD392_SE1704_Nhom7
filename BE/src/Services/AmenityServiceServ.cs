using BE.src.Domains.DTOs.AmenityService;
using BE.src.Domains.Enum;
using BE.src.Domains.Models;
using BE.src.Repositories;
using BE.src.Shared.Type;
using BE.src.Util;
using Microsoft.AspNetCore.Mvc;

namespace BE.src.Services
{
    public interface IAmenityServiceServ
    {
        Task<IActionResult> GetAllAmenityService();
        Task<IActionResult> CreateService(CreateServiceDTO data);
        Task<IActionResult> CreateServiceDetail(CreateServiceDetailDTO data);
    }

    public class AmenityServiceServ : IAmenityServiceServ
    {
        private readonly IAmenityServiceRepo _amenityServiceRepo;

        public AmenityServiceServ(IAmenityServiceRepo amenityServiceRepo)
        {
            _amenityServiceRepo = amenityServiceRepo;
        }

        public async Task<IActionResult> CreateService(CreateServiceDTO data)
        {
            try
            {
                var service = new AmenityService()
                {
                    Name = data.Name,
                    Type = data.Type,
                    Price = data.Price
                };
                string? url = await Utils.UploadImgToFirebase(data.Image, data.Name, "services");
                if (url == null)
                {
                    return ErrorResp.BadRequest("Fail to get url Image");
                }
                var image = new Image()
                {
                    Url = url,
                    AmenityServiceId = service.Id
                };
                bool isCreated = await _amenityServiceRepo.CreateService(service);
                if (!isCreated)
                {
                    return ErrorResp.BadRequest("Fail to create service");
                }
                bool isCreatedImage = await _amenityServiceRepo.CreateServiceImage(image);
                if (!isCreated)
                {
                    return ErrorResp.BadRequest("Fail to create service");
                }
                return SuccessResp.Created("Create service success");

            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }

        public async Task<IActionResult> CreateServiceDetail(CreateServiceDetailDTO data)
        {
            try
            {
                SerivceDetail serivceDetail = new()
                {
                    Name = data.Name,
                    IsNormal = true,
                    IsInUse = false,
                    AmenitySerivceId = data.AmenityServiceId
                };
                bool isCreated = await _amenityServiceRepo.CreateServiceDetail(serivceDetail);
                if (!isCreated)
                {
                    return ErrorResp.BadRequest("Cant create service detail");
                }
                return SuccessResp.Created("Create Service Detail Success");
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }

        public async Task<IActionResult> GetAllAmenityService()
        {
            try
            {
                var amenityServices = await _amenityServiceRepo.GetAllAmenityService();
                List<GetServicesDTO> returnServices = new List<GetServicesDTO>();
                foreach (AmenityService amenityService in amenityServices)
                {
                    int count = await _amenityServiceRepo.CountServiceRemain(amenityService.Id);
                    GetServicesDTO returnService = new()
                    {
                        amenityService = amenityService,
                        RemainingQuantity = count
                    };
                    returnServices.Add(returnService);
                }
                return SuccessResp.Ok(returnServices);
            }
            catch (System.Exception)
            {
                return ErrorResp.BadRequest("Error to get list Amenity and Service");
            }
        }
    }
}