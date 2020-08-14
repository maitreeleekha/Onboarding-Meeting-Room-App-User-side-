using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingRoom
{
    public class UserDb : DbContext
    {
        public UserDb(DbContextOptions<UserDb> options) : base(options)
        {

        }
        public DbSet<UserObject> Users { get; set; }
    }


    public class RoomsDb : DbContext
    {
        public RoomsDb(DbContextOptions<RoomsDb> options) : base(options)
        {

        }

        public DbSet<RoomObject> Rooms { get; set; }
    }

    public class BookingsDb :DbContext
    {
        public BookingsDb(DbContextOptions<BookingsDb> options) : base(options)
        {

        }

        public DbSet<BookingObject> Bookings { get; set; }
    }
}
