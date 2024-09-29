using BE.src.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BE.src.Services
{
    public interface IAmenityServiceService
    {
        Task<IActionResult> GetAllServices();
    }

    public class AmenityServiceService : IAmenityServiceService
    {
        private readonly IAmenityServiceRepository _repository;

        public AmenityServiceService(IAmenityServiceRepository repository)
        {
            _repository = repository;
        }

        public async Task<IActionResult> GetAllServices()
        {
            var services = await _repository.GetAllServices();

            if(services == null)
            {
                return new NotFoundObjectResult(new { Message = "Services not found" });
            }

            return new OkObjectResult(services);
        }
    }
}