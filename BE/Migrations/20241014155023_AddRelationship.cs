using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE.Migrations
{
    /// <inheritdoc />
    public partial class AddRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeviceCheckings_BookingItems_BookingItemId",
                table: "DeviceCheckings");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_DeviceCheckings_DeviceCheckingId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_DeviceCheckingId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_DeviceCheckings_BookingItemId",
                table: "DeviceCheckings");

            migrationBuilder.DropColumn(
                name: "DeviceCheckingId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "BookingItemId",
                table: "DeviceCheckings");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "DeviceCheckings",
                type: "varchar(300)",
                maxLength: 300,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_DeviceCheckings_BookingItemsId",
                table: "DeviceCheckings",
                column: "BookingItemsId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DeviceCheckings_StaffId",
                table: "DeviceCheckings",
                column: "StaffId");

            migrationBuilder.AddForeignKey(
                name: "FK_DeviceCheckings_BookingItems_BookingItemsId",
                table: "DeviceCheckings",
                column: "BookingItemsId",
                principalTable: "BookingItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DeviceCheckings_Users_StaffId",
                table: "DeviceCheckings",
                column: "StaffId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeviceCheckings_BookingItems_BookingItemsId",
                table: "DeviceCheckings");

            migrationBuilder.DropForeignKey(
                name: "FK_DeviceCheckings_Users_StaffId",
                table: "DeviceCheckings");

            migrationBuilder.DropIndex(
                name: "IX_DeviceCheckings_BookingItemsId",
                table: "DeviceCheckings");

            migrationBuilder.DropIndex(
                name: "IX_DeviceCheckings_StaffId",
                table: "DeviceCheckings");

            migrationBuilder.AddColumn<Guid>(
                name: "DeviceCheckingId",
                table: "Users",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "DeviceCheckings",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(300)",
                oldMaxLength: 300)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<Guid>(
                name: "BookingItemId",
                table: "DeviceCheckings",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_Users_DeviceCheckingId",
                table: "Users",
                column: "DeviceCheckingId");

            migrationBuilder.CreateIndex(
                name: "IX_DeviceCheckings_BookingItemId",
                table: "DeviceCheckings",
                column: "BookingItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_DeviceCheckings_BookingItems_BookingItemId",
                table: "DeviceCheckings",
                column: "BookingItemId",
                principalTable: "BookingItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_DeviceCheckings_DeviceCheckingId",
                table: "Users",
                column: "DeviceCheckingId",
                principalTable: "DeviceCheckings",
                principalColumn: "Id");
        }
    }
}
