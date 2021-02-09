using Microsoft.EntityFrameworkCore;
using School.Models;

namespace School.Datas
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<MessagesList> MessagesLists { get; set; }
        public DbSet<Journal> Journals { get; set; }
        public DbSet<GroupTeacher> GroupTeachers { get; set; }
        public DbSet<GroupTeacherLesson> GroupTeacherLessons { get; set; }
        public DbSet<GroupJournal> GroupJournals { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Monitoring> Monitorings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Group>(entity =>
            {
                entity.HasIndex(prop => prop.Name).IsUnique(true);
            });

            modelBuilder.Entity<GroupTeacher>(entity =>
            {
                entity.HasIndex(prop => new { prop.TeacherID, prop.GroupID }).IsUnique(true);
            });

            modelBuilder.Entity<GroupTeacherLesson>(entity =>
            {
                entity.HasIndex(prop => new { prop.GroupTeacherId,prop.LessonId }).IsUnique(true);
            });

            modelBuilder.Entity<GroupJournal>(entity =>
            {
                entity.HasIndex(prop => new { prop.GroupTeacherLessonId,prop.JournalID }).IsUnique(true);
            });
            modelBuilder.Entity<MessagesList>(entity =>
            {
                entity.HasIndex(prop => new { prop.StudentId,prop.TeacherId }).IsUnique(true);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
