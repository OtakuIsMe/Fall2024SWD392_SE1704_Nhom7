﻿// <auto-generated />
using System;
using BE.src.Domains.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BE.Migrations
{
    [DbContext(typeof(PodDbContext))]
    [Migration("20240929155118_AddDescriptionRoom")]
    partial class AddDescriptionRoom
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("BE.src.Domains.Models.AmenityService", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<float>("Price")
                        .HasColumnType("float");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("AmenityServices");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Area", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .HasColumnType("varchar(1000)");

                    b.Property<Guid>("LocationId")
                        .HasColumnType("char(36)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("LocationId")
                        .IsUnique();

                    b.ToTable("Areas");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Base.BaseEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("BaseEntity");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Booking", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("DateBooking")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("RoomId")
                        .HasColumnType("char(36)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<TimeSpan>("TimeBooking")
                        .HasColumnType("time(6)");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("RoomId");

                    b.HasIndex("UserId");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("BE.src.Domains.Models.BookingItem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("AmenityServiceId")
                        .HasColumnType("char(36)");

                    b.Property<int>("AmountItems")
                        .HasColumnType("int");

                    b.Property<Guid>("BookingId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<float>("Total")
                        .HasColumnType("float");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("AmenityServiceId");

                    b.HasIndex("BookingId");

                    b.ToTable("BookingItems");
                });

            modelBuilder.Entity("BE.src.Domains.Models.DepositWithdraw", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<float>("Amount")
                        .HasColumnType("float");

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Method")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("varchar(20)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("varchar(20)");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("DepositWithdraw");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Favourite", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("RoomId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("RoomId");

                    b.HasIndex("UserId");

                    b.ToTable("Favourites");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Image", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid?>("AreaId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid?>("RoomId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasMaxLength(300)
                        .HasColumnType("varchar(300)");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("AreaId");

                    b.HasIndex("RoomId");

                    b.HasIndex("UserId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Location", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Address")
                        .HasMaxLength(500)
                        .HasColumnType("varchar(500)");

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Latitude")
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Longitude")
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Membership", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<float>("Discount")
                        .HasColumnType("float");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<float>("Price")
                        .HasColumnType("float");

                    b.Property<int>("Rank")
                        .HasColumnType("int");

                    b.Property<TimeSpan>("TimeLeft")
                        .HasColumnType("time(6)");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Memberships");
                });

            modelBuilder.Entity("BE.src.Domains.Models.MembershipUser", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("MembershipId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("MembershipId");

                    b.HasIndex("UserId");

                    b.ToTable("MembershipUsers");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Notification", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(2000)
                        .HasColumnType("varchar(2000)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("BE.src.Domains.Models.PaymentRefund", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("BookingId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("PointBonus")
                        .HasColumnType("int");

                    b.Property<float>("Total")
                        .HasColumnType("float");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("BookingId");

                    b.ToTable("PaymentRefunds");
                });

            modelBuilder.Entity("BE.src.Domains.Models.RatingFeedback", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Feedback")
                        .IsRequired()
                        .HasMaxLength(2000)
                        .HasColumnType("varchar(2000)");

                    b.Property<int>("RatingStar")
                        .HasColumnType("int");

                    b.Property<Guid>("RoomId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("RoomId");

                    b.HasIndex("UserId");

                    b.ToTable("RatingFeedbacks");
                });

            modelBuilder.Entity("BE.src.Domains.Models.RefundItem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<int>("AmountItems")
                        .HasColumnType("int");

                    b.Property<Guid>("BookingItemId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("PaymentRefundId")
                        .HasColumnType("char(36)");

                    b.Property<float>("Total")
                        .HasColumnType("float");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("BookingItemId");

                    b.HasIndex("PaymentRefundId");

                    b.ToTable("RefundItems");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Room", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("AreaId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .HasColumnType("varchar(1000)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<float>("Price")
                        .HasColumnType("float");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("TypeRoom")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("varchar(10)");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("AreaId");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Transaction", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid?>("DepositWithdrawId")
                        .HasColumnType("char(36)");

                    b.Property<Guid?>("MembershipUserId")
                        .HasColumnType("char(36)");

                    b.Property<Guid?>("PaymentRefundId")
                        .HasColumnType("char(36)");

                    b.Property<float>("Total")
                        .HasColumnType("float");

                    b.Property<string>("TransactionType")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("varchar(10)");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("DepositWithdrawId")
                        .IsUnique();

                    b.HasIndex("MembershipUserId")
                        .IsUnique();

                    b.HasIndex("PaymentRefundId")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("BE.src.Domains.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("DOB")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Name")
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Password")
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Phone")
                        .HasMaxLength(15)
                        .HasColumnType("varchar(15)");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Username")
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<float>("Wallet")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("BE.src.Domains.Models.UserAreaManagement", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("AreaId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime?>("CreateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("UpdateAt")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("AreaId");

                    b.HasIndex("UserId");

                    b.ToTable("UserAreaManagements");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Area", b =>
                {
                    b.HasOne("BE.src.Domains.Models.Location", "Location")
                        .WithOne("Area")
                        .HasForeignKey("BE.src.Domains.Models.Area", "LocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Location");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Booking", b =>
                {
                    b.HasOne("BE.src.Domains.Models.Room", "Room")
                        .WithMany("Bookings")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BE.src.Domains.Models.User", "User")
                        .WithMany("Bookings")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Room");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BE.src.Domains.Models.BookingItem", b =>
                {
                    b.HasOne("BE.src.Domains.Models.AmenityService", "AmenityService")
                        .WithMany("BookingItems")
                        .HasForeignKey("AmenityServiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BE.src.Domains.Models.Booking", "Booking")
                        .WithMany("BookingItems")
                        .HasForeignKey("BookingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AmenityService");

                    b.Navigation("Booking");
                });

            modelBuilder.Entity("BE.src.Domains.Models.DepositWithdraw", b =>
                {
                    b.HasOne("BE.src.Domains.Models.User", "User")
                        .WithMany("DepositWithdraws")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Favourite", b =>
                {
                    b.HasOne("BE.src.Domains.Models.Room", "Room")
                        .WithMany("Favourites")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BE.src.Domains.Models.User", "User")
                        .WithMany("Favourites")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Room");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Image", b =>
                {
                    b.HasOne("BE.src.Domains.Models.Area", "Area")
                        .WithMany("Images")
                        .HasForeignKey("AreaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("BE.src.Domains.Models.Room", "Room")
                        .WithMany("Images")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("BE.src.Domains.Models.User", "User")
                        .WithMany("Images")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Area");

                    b.Navigation("Room");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BE.src.Domains.Models.MembershipUser", b =>
                {
                    b.HasOne("BE.src.Domains.Models.Membership", "Membership")
                        .WithMany("MembershipUsers")
                        .HasForeignKey("MembershipId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BE.src.Domains.Models.User", "User")
                        .WithMany("MembershipUsers")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Membership");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Notification", b =>
                {
                    b.HasOne("BE.src.Domains.Models.User", "User")
                        .WithMany("Notifications")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("BE.src.Domains.Models.PaymentRefund", b =>
                {
                    b.HasOne("BE.src.Domains.Models.Booking", "Booking")
                        .WithMany("PaymentRefunds")
                        .HasForeignKey("BookingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Booking");
                });

            modelBuilder.Entity("BE.src.Domains.Models.RatingFeedback", b =>
                {
                    b.HasOne("BE.src.Domains.Models.Room", "Room")
                        .WithMany("RatingFeedbacks")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BE.src.Domains.Models.User", "User")
                        .WithMany("RatingFeedbacks")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Room");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BE.src.Domains.Models.RefundItem", b =>
                {
                    b.HasOne("BE.src.Domains.Models.BookingItem", "BookingItem")
                        .WithMany("RefundItems")
                        .HasForeignKey("BookingItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BE.src.Domains.Models.PaymentRefund", "PaymentRefund")
                        .WithMany("RefundItems")
                        .HasForeignKey("PaymentRefundId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BookingItem");

                    b.Navigation("PaymentRefund");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Room", b =>
                {
                    b.HasOne("BE.src.Domains.Models.Area", "Area")
                        .WithMany("Rooms")
                        .HasForeignKey("AreaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Area");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Transaction", b =>
                {
                    b.HasOne("BE.src.Domains.Models.DepositWithdraw", "DepositWithdraw")
                        .WithOne("Transaction")
                        .HasForeignKey("BE.src.Domains.Models.Transaction", "DepositWithdrawId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("BE.src.Domains.Models.MembershipUser", "MembershipUser")
                        .WithOne("Transaction")
                        .HasForeignKey("BE.src.Domains.Models.Transaction", "MembershipUserId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("BE.src.Domains.Models.PaymentRefund", "PaymentRefund")
                        .WithOne("Transaction")
                        .HasForeignKey("BE.src.Domains.Models.Transaction", "PaymentRefundId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("BE.src.Domains.Models.User", "User")
                        .WithMany("Transactions")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DepositWithdraw");

                    b.Navigation("MembershipUser");

                    b.Navigation("PaymentRefund");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BE.src.Domains.Models.User", b =>
                {
                    b.HasOne("BE.src.Domains.Models.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("BE.src.Domains.Models.UserAreaManagement", b =>
                {
                    b.HasOne("BE.src.Domains.Models.Area", "Area")
                        .WithMany("UserAreaManagements")
                        .HasForeignKey("AreaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BE.src.Domains.Models.User", "User")
                        .WithMany("UserAreaManagements")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Area");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BE.src.Domains.Models.AmenityService", b =>
                {
                    b.Navigation("BookingItems");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Area", b =>
                {
                    b.Navigation("Images");

                    b.Navigation("Rooms");

                    b.Navigation("UserAreaManagements");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Booking", b =>
                {
                    b.Navigation("BookingItems");

                    b.Navigation("PaymentRefunds");
                });

            modelBuilder.Entity("BE.src.Domains.Models.BookingItem", b =>
                {
                    b.Navigation("RefundItems");
                });

            modelBuilder.Entity("BE.src.Domains.Models.DepositWithdraw", b =>
                {
                    b.Navigation("Transaction")
                        .IsRequired();
                });

            modelBuilder.Entity("BE.src.Domains.Models.Location", b =>
                {
                    b.Navigation("Area")
                        .IsRequired();
                });

            modelBuilder.Entity("BE.src.Domains.Models.Membership", b =>
                {
                    b.Navigation("MembershipUsers");
                });

            modelBuilder.Entity("BE.src.Domains.Models.MembershipUser", b =>
                {
                    b.Navigation("Transaction")
                        .IsRequired();
                });

            modelBuilder.Entity("BE.src.Domains.Models.PaymentRefund", b =>
                {
                    b.Navigation("RefundItems");

                    b.Navigation("Transaction")
                        .IsRequired();
                });

            modelBuilder.Entity("BE.src.Domains.Models.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("BE.src.Domains.Models.Room", b =>
                {
                    b.Navigation("Bookings");

                    b.Navigation("Favourites");

                    b.Navigation("Images");

                    b.Navigation("RatingFeedbacks");
                });

            modelBuilder.Entity("BE.src.Domains.Models.User", b =>
                {
                    b.Navigation("Bookings");

                    b.Navigation("DepositWithdraws");

                    b.Navigation("Favourites");

                    b.Navigation("Images");

                    b.Navigation("MembershipUsers");

                    b.Navigation("Notifications");

                    b.Navigation("RatingFeedbacks");

                    b.Navigation("Transactions");

                    b.Navigation("UserAreaManagements");
                });
#pragma warning restore 612, 618
        }
    }
}
