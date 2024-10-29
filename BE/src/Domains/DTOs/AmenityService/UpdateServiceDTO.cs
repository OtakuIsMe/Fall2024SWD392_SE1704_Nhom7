using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.src.Domains.DTOs.AmenityService
{
    public class UpdateServiceDTO
    {
        public required string Name {get; set;}
        public required float Price {get; set;}
        public required IFormFile Image {get; set;}
    }
}