using System.ComponentModel.DataAnnotations;

namespace backend.Models.Requests;

public class EditUserRequest
{
    [Required]
    public string Name { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string Phone { get; set; }
}