using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE.Migrations
{
    /// <inheritdoc />
    public partial class serviceDetail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "TimeLeft",
                table: "Memberships",
                type: "int",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "time(6)");

            migrationBuilder.AddColumn<Guid>(
                name: "ServiceDetailId",
                table: "BookingItems",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.CreateTable(
                name: "SerivceDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsNormal = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsInUse = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    AmenitySerivceId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    CreateAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    UpdateAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SerivceDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SerivceDetails_AmenityServices_AmenitySerivceId",
                        column: x => x.AmenitySerivceId,
                        principalTable: "AmenityServices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_BookingItems_ServiceDetailId",
                table: "BookingItems",
                column: "ServiceDetailId");

            migrationBuilder.CreateIndex(
                name: "IX_SerivceDetails_AmenitySerivceId",
                table: "SerivceDetails",
                column: "AmenitySerivceId");

            migrationBuilder.AddForeignKey(
                name: "FK_BookingItems_SerivceDetails_ServiceDetailId",
                table: "BookingItems",
                column: "ServiceDetailId",
                principalTable: "SerivceDetails",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookingItems_SerivceDetails_ServiceDetailId",
                table: "BookingItems");

            migrationBuilder.DropTable(
                name: "SerivceDetails");

            migrationBuilder.DropIndex(
                name: "IX_BookingItems_ServiceDetailId",
                table: "BookingItems");

            migrationBuilder.DropColumn(
                name: "ServiceDetailId",
                table: "BookingItems");

            migrationBuilder.AlterColumn<TimeSpan>(
                name: "TimeLeft",
                table: "Memberships",
                type: "time(6)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
