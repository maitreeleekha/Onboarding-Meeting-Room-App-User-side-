using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MeetingRoom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {

        public IEnumerable<RoomObject> Get(string roomId)
        {
            RoomObject r1 = new RoomObject { roomId = "ND-B1-A4-09", RoomType = "A", Location = "Noida", Capacity = 8, Description = "", Status = "N"  };
            RoomObject r2 = new RoomObject { roomId = "ND-B1-A5-19", RoomType = "B", Location = "Noida", Capacity = 6, Description = "", Status = "U" };
            RoomObject r3 = new RoomObject { roomId = "HYD-B2-B6-29", RoomType = "C", Location = "Hyderabad", Capacity = 12, Description = "", Status = "N" };
            RoomObject r4 = new RoomObject { roomId = "HYD-B1-A5-01", RoomType = "A", Location = "Hyderabad", Capacity = 7, Description = "", Status = "N" };
            RoomObject r5 = new RoomObject { roomId = "BLR-B1-A3-10", RoomType = "B", Location = "Bangalore", Capacity = 8, Description = "", Status = "N" };
            RoomObject r6 = new RoomObject { roomId = "BLR-B2-A4-07", RoomType = "C", Location = "Bangalore", Capacity = 15, Description = "", Status = "U" };
            RoomObject r7 = new RoomObject { roomId = "HYD-B1-A6-08", RoomType = "A", Location = "Hyderabad", Capacity = 6, Description = "", Status = "N" };


            List<RoomObject> rooms_objs = new List<RoomObject> { r1, r2, r3, r4, r5, r6, r7 };


            if (roomId == null)
            {
                var rng = new Random();
                return rooms_objs.Where(item => item.Status == "N").ToArray();
            }

            return rooms_objs.Where(item =>  (item.roomId == roomId && item.Status == "N") ).ToArray();

        }
    }
}
