using System.ComponentModel.DataAnnotations;

namespace backend.Models.Requests;

public class RegisterFeedbackRequest
{
    [Required]
    public long UserId { get; set; }
    [Required]
    public string Comment { get; set; }
    [Required]
    public int Rating { get; set; }
}