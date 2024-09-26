namespace BE.src.Domains.DTOs
{
    public class LoginRqDTO
    {
        public required string Email {  get; set; }
        public required string Password { get; set; }
    }
}
