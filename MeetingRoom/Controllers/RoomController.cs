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

        private RoomsDb _data;

        public RoomController(RoomsDb db)
        {
            _data = db;
        }

        public IEnumerable<RoomObject> Get(string roomId)
        {

            if (roomId == null)
            {
                var rng = new Random();
                return _data.Rooms.ToList().Where(item => item.Status == "N").ToArray();
            }

            return _data.Rooms.Where(item =>  (item.roomId == roomId && item.Status == "N") ).ToArray();

        }
    }
}
