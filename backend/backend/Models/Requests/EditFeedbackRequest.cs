using System.ComponentModel.DataAnnotations;

namespace backend.Models.Requests;

public class EditFeedbackRequest
{
    [Required]
    public bool IsApproved { get; set; }
    
    [Required]
    public long ApprovingAdmin { get; set; }
}