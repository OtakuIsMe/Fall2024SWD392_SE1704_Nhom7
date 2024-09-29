using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.src.Domains.DTOs
{
    public class RoomDto
    {
        public Guid RoomId { get; set; }
        public string TypeRoom { get; set; }
    }
}