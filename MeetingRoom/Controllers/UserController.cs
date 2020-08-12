﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MeetingRoom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        public IEnumerable<UserObject> Get(string userid)
        {
            UserObject u1 = new UserObject { userId = "52321", userName = "Maitree Leekha", emailId = "maitreeleekha@yahoo.in" };
            UserObject u2 = new UserObject { userId = "67234", userName = "Amit Roy", emailId = "amit@gmail.com" };
            UserObject u3 = new UserObject { userId = "64983", userName = "Mohit Kapoor", emailId = "mohit@gmail.com" };

            List<UserObject> users = new List<UserObject> { u1, u2, u3 };
            // 
            // IEnumerable<UserObject> ans = users.Where(item => item.userId == userid).ToList();

            IEnumerable<UserObject> ans =  new List<UserObject> { new UserObject { userId = userid, userName = "test new", emailId = "testemail" } };

                // 
            return ans;
        }
    }

}
