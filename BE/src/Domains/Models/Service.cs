using System;

namespace BE.src.Domains.Models
{
	public class Service
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public Area Area { get; set; }
	}
}
