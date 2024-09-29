using BE.src.Domains.Database;
using BE.src.Repositories;
using BE.src.Services;
using Microsoft.EntityFrameworkCore;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173")
                                .AllowAnyMethod()
                                .AllowAnyHeader();
                      });
});

builder.Services.AddScoped<IUserServ, UserServ>(); builder.Services.AddScoped<IRoomServ, RoomServ>();
builder.Services.AddScoped<IMembershipServ, MembershipServ>(); builder.Services.AddScoped<IAmenityServiceService, AmenityServiceService>();
builder.Services.AddScoped<IBookingServ, BookingServ>();

builder.Services.AddScoped<IUserRepo, UserRepo>(); builder.Services.AddScoped<IRoomRepo, RoomRepo>();
builder.Services.AddScoped<IMembershipRepo, MembershipRepo>(); builder.Services.AddScoped<IAmenityServiceRepository, AmenityServiceRepository>();
builder.Services.AddScoped<IBookingRepo, BookingRepo>();

builder.Services.AddDbContext<PodDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 27))));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);
app.UseDeveloperExceptionPage();

app.UseRouting();

app.MapControllers();

app.Run();