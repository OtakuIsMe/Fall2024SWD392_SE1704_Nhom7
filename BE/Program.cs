
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

Env.Load();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// builder.Services.AddControllers().AddNewtonsoftJson(options =>
// {
//     options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
// });

// builder.Services.AddDbContext<CourseOnlContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"), ServerVer.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))),
//     ServiceLifetime.Transient
// );

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
// app.UseAuthentication();
// app.UseAuthorization();

// app.MapControllers();

app.Run();
