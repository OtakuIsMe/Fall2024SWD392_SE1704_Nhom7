using System;

namespace BE.src.Domains.DTOs.Area
{
	public class AddServiceRqDTO
	{
		public string ServiceName { get; set; }
		public string Description { get; set; }
		public Guid AreaId { get; set; }  // Assuming AreaId is a Guid
	}
}
