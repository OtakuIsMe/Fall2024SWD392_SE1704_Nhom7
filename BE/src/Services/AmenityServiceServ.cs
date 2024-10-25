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
        Task<IActionResult> UpdateService(Guid id, UpdateServiceDTO service);
        Task<IActionResult> DeleteService(Guid amenityServiceId);
        Task<IActionResult> CheckService(Guid BookingItemsId, Guid StaffId, DeviceCheckingDTO data);
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

        public async Task<IActionResult> UpdateService(Guid id, UpdateServiceDTO service)
        {
            try
            {
                var serviceToUpdate = await _amenityServiceRepo.GetAmenityServiceById(id);

                if (serviceToUpdate == null)
                {
                    return ErrorResp.BadRequest("Service not found");
                }

                serviceToUpdate.Name = service.Name;
                serviceToUpdate.Price = service.Price;
                serviceToUpdate.UpdateAt = DateTime.Now;

                if (service.Image == null)
                {
                    return ErrorResp.BadRequest("Image is required");
                }

                string? url = await Utils.UploadImgToFirebase(service.Image, service.Name, "services");

                if (url == null)
                {
                    return ErrorResp.BadRequest("Fail to get url Image");
                }

                var image = await _amenityServiceRepo.GetImageByServiceId(id);
                if (image == null)
                {
                    return ErrorResp.BadRequest("Image not found");
                }

                image.Url = url;
                image.UpdateAt = DateTime.Now;

                bool isUpdated = await _amenityServiceRepo.UpdateService(serviceToUpdate);
                if (!isUpdated)
                {
                    return ErrorResp.BadRequest("Fail to update service");
                }

                bool isUpdatedImage = await _amenityServiceRepo.UpdateServiceImage(image);
                if (!isUpdatedImage)
                {
                    return ErrorResp.BadRequest("Fail to update image service");
                }

                return SuccessResp.Ok("Update service success");
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }


        public async Task<IActionResult> DeleteService(Guid amenityServiceId)
        {
            try
            {
                bool isDeleted = await _amenityServiceRepo.DeleteService(amenityServiceId);
                if (!isDeleted)
                {
                    return ErrorResp.BadRequest("Fail to delete service");
                }

                bool isDeletedImage = await _amenityServiceRepo.DeleteServiceImage(amenityServiceId);
                if (!isDeletedImage)
                {
                    return ErrorResp.BadRequest("Fail to delete image service");
                }

                return SuccessResp.Ok("Delete service success");
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }

        public async Task<IActionResult> CheckService(Guid BookingItemsId, Guid StaffId, DeviceCheckingDTO data)
        {
            try
            {
                var checkService = await _amenityServiceRepo.GetDeviceChecking(BookingItemsId);
                if (checkService != null)
                {
                    checkService.StaffId = StaffId;
                    checkService.Status = data.Status;
                    checkService.Description = data.Description;
                    var isUpdated = await _amenityServiceRepo.UpdateDeviceChecking(checkService);
                    if (!isUpdated)
                    {
                        return ErrorResp.BadRequest("Error to update check device");
                    }
                }
                else
                {
                    DeviceChecking deviceChecking = new()
                    {
                        StaffId = StaffId,
                        BookingItemsId = BookingItemsId,
                        Status = data.Status,
                        Description = data.Description
                    };
                    var IsAddded = await _amenityServiceRepo.AddDeviceChecking(deviceChecking);
                    if (!IsAddded)
                    {
                        return ErrorResp.BadRequest("Error to add device check");
                    }
                }
                return SuccessResp.Ok("Check Device Success");
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }
    }
}