using BE.src.Domains.Models.Base;

namespace BE.src.Domains.Models
{
    public class Role : BaseEntity
    {
        public string Name { get; set; } = null!;

        public ICollection<User> Users { get; set; } = null!;
    }
}