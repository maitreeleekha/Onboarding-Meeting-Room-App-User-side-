using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingRoom
{
    public class BookingObject
    {

    [Key]
    public string bookingId { get; set; }
    public string bookingDate { get; set; }
    public string meetingDate { get; set; }
    public string meetingTime { get; set; }
    public string employeeId { get; set; }
    public string roomId { get; set; }
    public string additionalEquipments { get; set; }
    public string actionRequired { get; set; }

    public string layoutRequired { get; set; }

    }
}
