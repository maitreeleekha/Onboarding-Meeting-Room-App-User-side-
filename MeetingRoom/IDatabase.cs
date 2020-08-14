using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingRoom
{
    interface IDatabase<T>
    {
        public abstract IEnumerable<T> FindAll();

        public abstract T FindbyId(string id);


        public abstract void Add(T obj);

        public abstract int Commit();
    }
}
