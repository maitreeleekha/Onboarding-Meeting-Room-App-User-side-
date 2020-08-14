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
        private BookingsDb _data;

        public BookingController(BookingsDb db)
        {
            _data = db;
        }
        public IEnumerable<BookingObject> Get(string empId)
        {
            if (empId == null)
            {
                return _data.Bookings;
            }
                return _data.Bookings.Where(item => item.employeeId == empId).ToArray();
        }


        [HttpPost]
        public BookingObject Post(Dictionary<string, string> newBooking)
        {

            BookingObject booking = new BookingObject { bookingId = newBooking["bookingId"], bookingDate = newBooking["bookingDate"], 
                meetingDate = newBooking["meetingDate"], meetingTime = newBooking["meetingTime"], employeeId = newBooking["employeeId"], 
                roomId = newBooking["roomId"], actionRequired = newBooking["actionRequired"], additionalEquipments = newBooking["equip"], 
                layoutRequired = newBooking["layoutRequired"]};
      
            // add in try catch blocks
            //check if the user is not already signed in!
            _data.Add(booking);
            _data.SaveChanges();
            return booking;
        }

        [HttpPut]
        public string PutActionRequired(string bookingId, string actionRequired)
        {

            var result = _data.Bookings.SingleOrDefault(item => item.bookingId==bookingId);
            if(result != null)
            {
                result.actionRequired = actionRequired;
                _data.SaveChanges();
                return result.bookingId;
            }

            return "";

        }

        [HttpDelete]

        public string DeleteBooking(string bookingId)
        {
            BookingObject delbooking = _data.Bookings.SingleOrDefault(item => item.bookingId == bookingId);
            if (delbooking != null)
            {
                _data.Remove(delbooking);
                _data.SaveChanges();
                return "1";
            }
            return "0";
        }
    }
}
