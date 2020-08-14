using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingRoom
{
    public class UserObject
    {
        [Key]
        public string userId { get; set; }
        public string password { get; set; } // how to protect?
        public string userName { get; set; }
        public string emailId { get; set; }
    }
}
