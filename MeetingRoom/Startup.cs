using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using MeetingRoom.Controllers;

namespace MeetingRoom
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {



            services.AddDbContext<UserDb>(opt => opt.UseInMemoryDatabase("users.db"));
            services.AddDbContext<RoomsDb>(opt => opt.UseInMemoryDatabase("rooms.db"));
            services.AddDbContext<BookingsDb>(opt => opt.UseInMemoryDatabase("bookings.db"));

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, UserDb userdbContext, RoomsDb roomdbContext, BookingsDb bookingdbContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }



            UserObject u1 = new UserObject { userId = "53231", userName = "Maitree Leekha", emailId = "maitreeleekha@yahoo.in", password="0000" };
            UserObject u2 = new UserObject { userId = "67234", userName = "Amit Roy", emailId = "amit@gmail.com", password = "0801" };
            UserObject u3 = new UserObject { userId = "64983", userName = "Mohit Kapoor", emailId = "mohit@gmail.com", password = "0000" };
            userdbContext.Add(u1);
            userdbContext.SaveChanges();
            userdbContext.Add(u2);
            userdbContext.SaveChanges();
            userdbContext.Add(u3);
            userdbContext.SaveChanges();


            RoomObject r1 = new RoomObject { roomId = "ND-B1-A4-09", RoomType = "A", Location = "Noida", Capacity = 8, Description = "", Status = "N" };
            RoomObject r2 = new RoomObject { roomId = "ND-B1-A5-19", RoomType = "B", Location = "Noida", Capacity = 6, Description = "", Status = "U" };
            RoomObject r3 = new RoomObject { roomId = "HYD-B2-B6-29", RoomType = "C", Location = "Hyderabad", Capacity = 12, Description = "", Status = "N" };
            RoomObject r4 = new RoomObject { roomId = "HYD-B1-A5-01", RoomType = "A", Location = "Hyderabad", Capacity = 7, Description = "", Status = "N" };
            RoomObject r5 = new RoomObject { roomId = "BLR-B1-A3-10", RoomType = "B", Location = "Bangalore", Capacity = 8, Description = "", Status = "N" };
            RoomObject r6 = new RoomObject { roomId = "BLR-B2-A4-07", RoomType = "C", Location = "Bangalore", Capacity = 15, Description = "", Status = "U" };
            RoomObject r7 = new RoomObject { roomId = "HYD-B1-A6-08", RoomType = "A", Location = "Hyderabad", Capacity = 6, Description = "", Status = "N" };
            roomdbContext.Add(r1);
            roomdbContext.SaveChanges();
            roomdbContext.Add(r2);
            roomdbContext.SaveChanges();
            roomdbContext.Add(r3);
            roomdbContext.SaveChanges();
            roomdbContext.Add(r4);
            roomdbContext.SaveChanges();
            roomdbContext.Add(r5);
            roomdbContext.SaveChanges();
            roomdbContext.Add(r6);
            roomdbContext.SaveChanges();
            roomdbContext.Add(r7);
            roomdbContext.SaveChanges();


            BookingObject b1 = new BookingObject { bookingId = "KJSD128", bookingDate = "2020-07-27", meetingDate = "2020-08-17", meetingTime = "11:00-13:30", employeeId = "632522", roomId = "ND-B1-A4-09", actionRequired = "", additionalEquipments = "", layoutRequired="round" };
            BookingObject b2 = new BookingObject { bookingId = "HJSD562", bookingDate = "2020-078-01", meetingDate = "2020-08-17", meetingTime = "11:00-13:30", employeeId = "632522", roomId = "ND-B1-A5-19", actionRequired = "", additionalEquipments = "" , layoutRequired = "round" };
            BookingObject b3 = new BookingObject { bookingId = "XHSDJ17H", bookingDate = "2020-08-01", meetingDate = "2020-08-17", meetingTime = "11:00-13:30", employeeId = "53231", roomId = "ND-B1-A4-09", additionalEquipments = "", actionRequired = "", layoutRequired = "round" };
            BookingObject b4 = new BookingObject { bookingId = "XIUDU27N", bookingDate = "2020-08-03", meetingDate = "2020-09-08", meetingTime = "14:00-17:30", employeeId = "53231", roomId = "HYD-B1-A5-16", additionalEquipments = "Printer", actionRequired = "", layoutRequired = "round" };
            BookingObject b5 = new BookingObject { bookingId = "JSDHD912", bookingDate = "2020-08-03", meetingDate = "2020-08-10", meetingTime = "14:00-17:30", employeeId = "53231", roomId = "HYD-B1-A5-16", additionalEquipments = "Printer", actionRequired = "", layoutRequired = "round" };

            bookingdbContext.Add(b1);
            bookingdbContext.SaveChanges();
            bookingdbContext.Add(b2);
            bookingdbContext.SaveChanges();
            bookingdbContext.Add(b3);
            bookingdbContext.SaveChanges();
            bookingdbContext.Add(b4);
            bookingdbContext.SaveChanges();
            bookingdbContext.Add(b5);
            bookingdbContext.SaveChanges();







            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
