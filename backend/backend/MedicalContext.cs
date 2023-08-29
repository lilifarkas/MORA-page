using backend.Models.Entities;

namespace backend;
using Microsoft.EntityFrameworkCore;

public class MedicalContext: DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<BookedDate> BookedDates { get; set; }
    
    public DbSet<Feedback> Feedbacks { get; set; }
    
    public MedicalContext(DbContextOptions<MedicalContext> options): base(options)
    {
        
    }
}