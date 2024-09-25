using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserDOB2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "DepositWithdrawId",
                table: "Transactions",
                type: "char(36)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DepositWithdraw",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Amount = table.Column<float>(type: "float", nullable: false),
                    Type = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    Method = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserId1 = table.Column<Guid>(type: "char(36)", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DepositWithdraw", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DepositWithdraw_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DepositWithdraw_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "Id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_DepositWithdrawId",
                table: "Transactions",
                column: "DepositWithdrawId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DepositWithdraw_UserId",
                table: "DepositWithdraw",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DepositWithdraw_UserId1",
                table: "DepositWithdraw",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_DepositWithdraw_DepositWithdrawId",
                table: "Transactions",
                column: "DepositWithdrawId",
                principalTable: "DepositWithdraw",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_DepositWithdraw_DepositWithdrawId",
                table: "Transactions");

            migrationBuilder.DropTable(
                name: "DepositWithdraw");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_DepositWithdrawId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "DepositWithdrawId",
                table: "Transactions");
        }
    }
}
