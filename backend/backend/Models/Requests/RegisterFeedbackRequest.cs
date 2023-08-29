using System.ComponentModel.DataAnnotations;

namespace backend.Models.Requests;

public class RegisterFeedbackRequest
{
    [Required]
    public DateTime Date { get; set; }
    [Required]
    public long UserId { get; set; }
    [Required]
    public string Comment { get; set; }
    [Required]
    public int Rating { get; set; }
    [Required]
    public bool IsApproved { get; set; }
    public long? ApprovingAdmin { get; set; }
}