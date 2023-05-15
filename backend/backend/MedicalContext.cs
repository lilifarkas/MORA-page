using backend.Models.Entities;

namespace backend;
using Microsoft.EntityFrameworkCore;

public class MedicalContext: DbContext
{
    public DbSet<User> Users { get; set; }
    
    public MedicalContext(DbContextOptions<MedicalContext> options): base(options)
    {
        
    }
}