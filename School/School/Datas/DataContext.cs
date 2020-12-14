using Microsoft.EntityFrameworkCore;
using School.Models;

namespace School.Datas
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { }
        public DbSet<Group> Groups { get; set; }
        public DbSet<GroupJurnal> GroupJurnals { get; set; }
        public DbSet<Jurnal> Jurnals { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Group>(entity =>
            {
                entity.HasIndex(prop => prop.Name).IsUnique(true);
            });
            base.OnModelCreating(modelBuilder);
        }
    }
}
