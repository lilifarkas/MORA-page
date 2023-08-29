using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Entities;

public class Feedback
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long ID { get; set; }
    public DateTime Date { get; set; }
    public long UserId { get; set; }
    public string Comment { get; set; }
    public int Rating { get; set; }
    public bool? IsApproved { get; set; }
    public long? ApprovingAdmin { get; set; }
}