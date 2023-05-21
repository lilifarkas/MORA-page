using System.ComponentModel.DataAnnotations;

namespace backend.Models.Requests;

public class RefreshRequest
{
    [Required]
    public string RefreshToken { get; set; }
}