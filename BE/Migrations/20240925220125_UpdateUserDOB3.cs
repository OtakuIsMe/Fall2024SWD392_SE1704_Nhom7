using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserDOB3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DepositWithdraw_Users_UserId1",
                table: "DepositWithdraw");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Users_UserId1",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_RatingFeedbacks_Rooms_RoomId1",
                table: "RatingFeedbacks");

            migrationBuilder.DropForeignKey(
                name: "FK_RatingFeedbacks_Users_UserId1",
                table: "RatingFeedbacks");

            migrationBuilder.DropIndex(
                name: "IX_RatingFeedbacks_RoomId1",
                table: "RatingFeedbacks");

            migrationBuilder.DropIndex(
                name: "IX_RatingFeedbacks_UserId1",
                table: "RatingFeedbacks");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_UserId1",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_DepositWithdraw_UserId1",
                table: "DepositWithdraw");

            migrationBuilder.DropColumn(
                name: "RoomId1",
                table: "RatingFeedbacks");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "RatingFeedbacks");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "DepositWithdraw");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "RoomId1",
                table: "RatingFeedbacks",
                type: "char(36)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId1",
                table: "RatingFeedbacks",
                type: "char(36)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId1",
                table: "Notifications",
                type: "char(36)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId1",
                table: "DepositWithdraw",
                type: "char(36)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RatingFeedbacks_RoomId1",
                table: "RatingFeedbacks",
                column: "RoomId1");

            migrationBuilder.CreateIndex(
                name: "IX_RatingFeedbacks_UserId1",
                table: "RatingFeedbacks",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId1",
                table: "Notifications",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_DepositWithdraw_UserId1",
                table: "DepositWithdraw",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_DepositWithdraw_Users_UserId1",
                table: "DepositWithdraw",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Users_UserId1",
                table: "Notifications",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RatingFeedbacks_Rooms_RoomId1",
                table: "RatingFeedbacks",
                column: "RoomId1",
                principalTable: "Rooms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RatingFeedbacks_Users_UserId1",
                table: "RatingFeedbacks",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
