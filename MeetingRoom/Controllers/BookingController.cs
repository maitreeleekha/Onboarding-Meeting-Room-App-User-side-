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
    public class BookingController : ControllerBase
    {
        public IEnumerable<BookingObject> Get(string empId)
        {
            BookingObject b1 = new BookingObject { bookingId="KJSD128", bookingDate="2020-07-27", meetingDate="2020-08-17", meetingTime="11:00-13:30", employeeId="632522", roomId = "ND-B1-A4-09", actionRequired="", additionalEquipments=""};
            BookingObject b2 = new BookingObject { bookingId = "HJSD562", bookingDate = "2020-078-01", meetingDate = "2020-08-17", meetingTime = "11:00-13:30", employeeId = "632522", roomId = "ND-B1-A5-19", actionRequired = "", additionalEquipments = ""};

            BookingObject b3 = new BookingObject { bookingId = "XHSDJ17H", bookingDate = "2020-08-01", meetingDate = "2020-08-17", meetingTime = "11:00-13:30", employeeId = "53231", roomId = "ND-B1-A4-09", additionalEquipments = "", actionRequired = "" };
            BookingObject b4 = new BookingObject { bookingId = "XIUDU27N", bookingDate = "2020-08-03", meetingDate = "2020-09-08", meetingTime = "14:00-17:30", employeeId = "53231", roomId = "HYD-B1-A5-16", additionalEquipments ="Printer", actionRequired = "" };

            BookingObject b5 = new BookingObject { bookingId = "JSDHD912", bookingDate = "2020-08-03", meetingDate = "2020-08-10", meetingTime = "14:00-17:30", employeeId = "53231", roomId = "HYD-B1-A5-16", additionalEquipments = "Printer", actionRequired = "" };



            List<BookingObject> booking_objs = new List<BookingObject> { b1, b2, b3, b4, b5 };

            if (empId == null)
            {
                return booking_objs;
            }
                return booking_objs.Where(item => item.employeeId == empId).ToArray();
            

        }

    }
}
