using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Entities;

public class User
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long ID { get; set; }
    public string Name { get; set; }
    public string Role { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Password { get; set; }
    public virtual ICollection<BookedDate>? BookedDates { get; set; } = new List<BookedDate>();
}