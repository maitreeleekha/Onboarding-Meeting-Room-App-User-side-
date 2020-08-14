using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MeetingRoom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private List<UserObject> _data;
        
        private readonly UserDb data;

        public UserController(UserDb db)
        {
            this.data = db;
        }

        public IEnumerable<UserObject> Get(string userid)
        {
            if (userid != null)
            {
                IEnumerable<UserObject> ans =  data.Users.ToList().Where(item => item.userId == userid) ;
                return ans;
            }

            return  data.Users.ToList();
        }

        [HttpPost]
        public string Post(Dictionary<string, string> newuser)
        {

            // add in try catch blocks
            //check if the user is not already signed in!

            if(data.Users.Where(item => item.userId == newuser["userId"]).ToList().Count != 1)
            {
                UserObject newUserObject = new UserObject { emailId = newuser["emailId"], userId = newuser["userId"], userName = newuser["userName"], password = newuser["password"] };

                data.Add(newUserObject);
                data.SaveChanges();
                
                return newUserObject.userId;

            }

            return ""; 
                //new UserObject { emailId = "", userId = "", userName = "", password = ""};


        }

    }

}
