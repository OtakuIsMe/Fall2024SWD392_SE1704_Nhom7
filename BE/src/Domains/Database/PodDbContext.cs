using BE.src.Domains.Models;
using BE.src.Domains.Models.Base;
using Microsoft.EntityFrameworkCore;
using System.Configuration;
using System.Reflection.Emit;

namespace BE.src.Domains.Database
{
      public class PodDbContext : DbContext
      {
            public DbSet<AmenityService> AmenityServices { get; set; } = null!;
            public DbSet<Area> Areas { get; set; } = null!;
            public DbSet<Booking> Bookings { get; set; } = null!;
            public DbSet<BookingItem> BookingItems { get; set; } = null!;
            public DbSet<Role> Roles { get; set; } = null!;
            public DbSet<User> Users { get; set; } = null!;
            public DbSet<Membership> Memberships { get; set; } = null!;
            public DbSet<MembershipUser> MembershipUsers { get; set; } = null!;
            public DbSet<Notification> Notifications { get; set; } = null!;
            public DbSet<PaymentRefund> PaymentRefunds { get; set; } = null!;
            public DbSet<RatingFeedback> RatingFeedbacks { get; set; } = null!;
            public DbSet<RefundItem> RefundItems { get; set; } = null!;
            public DbSet<Room> Rooms { get; set; } = null!;
            public DbSet<Image> Images { get; set; } = null!;
            public DbSet<Favourite> Favourites { get; set; } = null!;
            public DbSet<UserAreaManagement> UserAreaManagements { get; set; } = null!;
            public DbSet<Location> Locations { get; set; } = null!;
            public DbSet<Transaction> Transactions { get; set; } = null!;

            private readonly IConfiguration _configuration;

            public PodDbContext(DbContextOptions<PodDbContext> options, IConfiguration configuration)
                : base(options)
            {
                  _configuration = configuration;
            }

            protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            {
                  if (!optionsBuilder.IsConfigured) // Check if already configured
                  {
                        optionsBuilder.UseMySql(_configuration.GetConnectionString("DefaultConnection"),
                            new MySqlServerVersion(new Version(8, 0, 27)));
                  }
            }

            protected override void OnModelCreating(ModelBuilder builder)
            {
                  base.OnModelCreating(builder);

                  builder.Entity<AmenityService>(entity =>
                  {
                        entity.HasKey(a => a.Id);
                        entity.Property(a => a.Name)
                        .IsRequired()
                        .HasMaxLength(100);
                        entity.Property(a => a.Price)
                        .IsRequired();
                  });

                  builder.Entity<Area>(entity =>
                  {
                        entity.HasKey(a => a.Id);

                        entity.Property(a => a.Name)
                        .IsRequired()
                        .HasMaxLength(200);

                        entity.Property(a => a.Description)
                        .IsRequired()
                        .HasMaxLength(1000);

                        entity.HasOne(a => a.Location)
                        .WithOne(l => l.Area)
                        .HasForeignKey<Area>(a => a.LocationId);
                  });

                  builder.Entity<Booking>(entity =>
                  {
                        entity.HasKey(b => b.Id);

                        entity.Property(b => b.TimeBooking)
                        .IsRequired();

                        entity.Property(b => b.DateBooking)
                        .IsRequired();

                        entity.Property(b => b.Status)
                        .IsRequired();

                        entity.HasOne(b => b.User)
                        .WithMany(u => u.Bookings)
                        .HasForeignKey(b => b.UserId);

                        entity.HasOne(b => b.Room)
                        .WithMany(r => r.Bookings)
                        .HasForeignKey(b => b.RoomId);
                  });

                  builder.Entity<BookingItem>(entity =>
                  {
                        entity.HasKey(bi => bi.Id);

                        entity.Property(bi => bi.AmountItems)
                        .IsRequired();

                        entity.Property(bi => bi.Total)
                        .IsRequired();

                        entity.Property(bi => bi.Status)
                        .IsRequired();

                        entity.HasOne(bi => bi.Booking)
                        .WithMany(b => b.BookingItems)
                        .HasForeignKey(bi => bi.BookingId);

                        entity.HasOne(bi => bi.AmenityService)
                        .WithMany(amenityService => amenityService.BookingItems)
                        .HasForeignKey(bi => bi.AmenityServiceId);
                  });

                  builder.Entity<DepositWithdraw>(entity =>
                  {
                        entity.HasKey(e => e.Id);

                        entity.Property(e => e.Amount)
                              .IsRequired();

                        entity.Property(e => e.Type)
                              .IsRequired()
                              .HasMaxLength(20);

                        entity.Property(e => e.Method)
                              .IsRequired()
                              .HasMaxLength(20);

                        entity.HasOne(d => d.User)
                              .WithMany(u => u.DepositWithdraws)
                              .HasForeignKey(d => d.UserId)
                              .OnDelete(DeleteBehavior.Cascade);
                  });

                  builder.Entity<Favourite>(entity =>
                  {
                        entity.HasKey(f => f.Id);

                        entity.HasOne(f => f.Room)
                        .WithMany(r => r.Favourites)
                        .HasForeignKey(f => f.RoomId)
                        .OnDelete(DeleteBehavior.Cascade);

                        entity.HasOne(f => f.User)
                        .WithMany(u => u.Favourites)
                        .HasForeignKey(f => f.UserId)
                        .OnDelete(DeleteBehavior.Cascade);
                  });

                  builder.Entity<Image>(entity =>
                  {
                        entity.HasKey(i => i.Id);

                        entity.Property(i => i.Url)
                        .IsRequired()
                        .HasMaxLength(300);

                        entity.HasOne(i => i.Room)
                        .WithMany(r => r.Images)
                        .HasForeignKey(i => i.RoomId)
                        .OnDelete(DeleteBehavior.Cascade);

                        entity.HasOne(i => i.Area)
                        .WithMany(a => a.Images)
                        .HasForeignKey(i => i.AreaId)
                        .OnDelete(DeleteBehavior.Cascade);

                        entity.HasOne(i => i.User)
                        .WithMany(u => u.Images)
                        .HasForeignKey(i => i.UserId)
                        .OnDelete(DeleteBehavior.Cascade);
                  });

                  builder.Entity<Location>(entity =>
                  {
                        entity.HasKey(l => l.Id);

                        entity.Property(l => l.Address)
                        .IsRequired(false)
                        .HasMaxLength(500);

                        entity.Property(l => l.Longitude)
                        .IsRequired(false)
                        .HasMaxLength(50);

                        entity.Property(l => l.Latitude)
                        .IsRequired(false)
                        .HasMaxLength(50);

                        entity.HasOne(l => l.Area)
                        .WithOne(a => a.Location)
                        .HasForeignKey<Area>(a => a.LocationId)
                        .OnDelete(DeleteBehavior.Cascade);
                  });

                  builder.Entity<Membership>(entity =>
                  {
                        entity.HasKey(m => m.Id);

                        entity.Property(m => m.Name)
                        .IsRequired()
                        .HasMaxLength(50);

                        entity.Property(m => m.Discount)
                        .IsRequired();

                        entity.Property(m => m.TimeLeft)
                        .IsRequired();

                        entity.Property(m => m.Price)
                        .IsRequired();

                        entity.Property(m => m.Rank)
                        .IsRequired();
                  });

                  builder.Entity<MembershipUser>(entity =>
                  {
                        entity.HasKey(mu => mu.Id);

                        entity.HasOne(mu => mu.Membership)
                        .WithMany(m => m.MembershipUsers)
                        .HasForeignKey(mu => mu.MembershipId)
                        .OnDelete(DeleteBehavior.Cascade);

                        entity.HasOne(mu => mu.User)
                        .WithMany(u => u.MembershipUsers)
                        .HasForeignKey(mu => mu.UserId)
                        .OnDelete(DeleteBehavior.Cascade);

                        entity.HasOne(mu => mu.Transaction)
                        .WithOne(t => t.MembershipUser)
                        .HasForeignKey<Transaction>(t => t.MembershipUserId)
                        .OnDelete(DeleteBehavior.Cascade);
                  });

                  builder.Entity<Notification>(entity =>
                  {
                        entity.HasKey(n => n.Id);

                        entity.Property(n => n.Title)
                        .IsRequired()
                        .HasMaxLength(200);

                        entity.Property(n => n.Description)
                        .IsRequired()
                        .HasMaxLength(2000);

                        entity.HasOne(n => n.User)
                        .WithMany(u => u.Notifications)
                        .HasForeignKey(n => n.UserId)
                        .OnDelete(DeleteBehavior.Cascade);
                  });

                  builder.Entity<PaymentRefund>(entity =>
                  {
                        entity.HasKey(pr => pr.Id);

                        entity.Property(pr => pr.Type)
                        .IsRequired();

                        entity.Property(pr => pr.Total)
                        .IsRequired();

                        entity.Property(pr => pr.PointBonus)
                        .IsRequired();

                        entity.HasOne(pr => pr.Booking)
                        .WithMany(b => b.PaymentRefunds)
                        .HasForeignKey(pr => pr.BookingId)
                        .OnDelete(DeleteBehavior.Cascade);

                        entity.HasOne(pr => pr.Transaction)
                        .WithOne(t => t.PaymentRefund)
                        .HasForeignKey<PaymentRefund>(pr => pr.Id)
                        .OnDelete(DeleteBehavior.Cascade);
                  });

                  builder.Entity<RatingFeedback>(entity =>
                  {
                        entity.HasKey(rf => rf.Id);

                        entity.Property(rf => rf.Feedback)
                        .IsRequired()
                        .HasMaxLength(2000);

                        entity.Property(rf => rf.RatingStar)
                        .IsRequired();

                        entity.HasOne(rf => rf.User)
                        .WithMany(u => u.RatingFeedbacks)
                        .HasForeignKey(rf => rf.UserId)
                        .OnDelete(DeleteBehavior.Cascade);

                        entity.HasOne(rf => rf.Room)
                        .WithMany(r => r.RatingFeedbacks)
                        .HasForeignKey(rf => rf.RoomId)
                        .OnDelete(DeleteBehavior.Cascade);
                  });
                  builder.Entity<RefundItem>(entity =>
                  {
                        entity.HasKey(ri => ri.Id);

                        entity.Property(ri => ri.AmountItems)
                        .IsRequired();

                        entity.Property(ri => ri.Total)
                        .IsRequired();

                        entity.HasOne(ri => ri.PaymentRefund)
                        .WithMany(pr => pr.RefundItems)
                        .HasForeignKey(ri => ri.PaymentRefundId)
                        .OnDelete(DeleteBehavior.Cascade);

                        entity.HasOne(ri => ri.BookingItem)
                        .WithMany(bi => bi.RefundItems)
                        .HasForeignKey(ri => ri.BookingItemId)
                        .OnDelete(DeleteBehavior.Cascade);
                  });
                  builder.Entity<Role>(entity =>
                  {
                        entity.HasKey(r => r.Id);

                        entity.Property(r => r.Name)
                        .IsRequired()
                        .HasMaxLength(50);
                  });
                  builder.Entity<Room>(entity =>
                  {
                        entity.HasKey(r => r.Id);

                        entity.Property(r => r.Name)
                        .IsRequired()
                        .HasMaxLength(200);

                        entity.Property(r => r.Price)
                        .IsRequired();

                        entity.Property(r => r.Status)
                        .IsRequired();

                        entity.HasOne(r => r.Area)
                        .WithMany(a => a.Rooms)
                        .HasForeignKey(r => r.AreaId)
                        .OnDelete(DeleteBehavior.Cascade);
                  });
                  builder.Entity<Transaction>(entity =>
                  {
                        entity.HasKey(t => t.Id);

                        entity.Property(t => t.TransactionType)
                        .IsRequired();

                        entity.Property(t => t.Total)
                        .IsRequired();

                        entity.HasOne(t => t.PaymentRefund)
                        .WithOne(pr => pr.Transaction)
                        .HasForeignKey<Transaction>(t => t.PaymentRefundId)
                        .OnDelete(DeleteBehavior.SetNull);

                        entity.HasOne(t => t.MembershipUser)
                        .WithOne(mu => mu.Transaction)
                        .HasForeignKey<Transaction>(t => t.MembershipUserId)
                        .OnDelete(DeleteBehavior.SetNull);

                        entity.HasOne(t => t.DepositWithdraw)
                        .WithOne(dw => dw.Transaction)
                        .HasForeignKey<Transaction>(t => t.DepositWithdrawId)
                        .OnDelete(DeleteBehavior.SetNull);

                        entity.HasOne(t => t.User)
                        .WithMany(u => u.Transactions)
                        .HasForeignKey(t => t.UserId)
                        .OnDelete(DeleteBehavior.Cascade);
                  });
                  builder.Entity<User>(entity =>
                  {
                        entity.HasKey(u => u.Id);

                        entity.Property(u => u.Name)
                        .IsRequired(false)
                        .HasMaxLength(100);

                        entity.Property(u => u.Phone)
                        .IsRequired(false)
                        .HasMaxLength(15);

                        entity.Property(u => u.Email)
                        .IsRequired()
                        .HasMaxLength(100);

                        entity.Property(u => u.Password)
                        .IsRequired(false)
                        .HasMaxLength(100);

                        entity.Property(u => u.Username)
                        .IsRequired(false)
                        .HasMaxLength(50);

                        entity.Property(u => u.DOB)
                        .IsRequired(false);

                        entity.HasOne(u => u.Role)
                        .WithMany(r => r.Users)
                        .HasForeignKey(u => u.RoleId)
                        .OnDelete(DeleteBehavior.Cascade);
                  });
                  builder.Entity<UserAreaManagement>(entity =>
                  {
                        entity.HasKey(uam => uam.Id);

                        entity.HasOne(uam => uam.User)
                        .WithMany(u => u.UserAreaManagements)
                        .HasForeignKey(uam => uam.UserId)
                        .OnDelete(DeleteBehavior.Cascade);

                        entity.HasOne(uam => uam.Area)
                        .WithMany(a => a.UserAreaManagements)
                        .HasForeignKey(uam => uam.AreaId)
                        .OnDelete(DeleteBehavior.Cascade);
                  });
                  builder.Entity<BaseEntity>()
                        .Property(b => b.CreateAt)
                        .IsRequired(false);

                  builder.Entity<BaseEntity>()
                      .Property(b => b.UpdateAt)
                      .IsRequired(false);
            }
      }
}