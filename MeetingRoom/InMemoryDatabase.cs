using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingRoom
{

    public class InMemoryDatabase <T> : DbContext, IDatabase<T> where T: class
    {
        DbContext _ctx;
        DbSet<T> _set;
        public InMemoryDatabase(DbContext ctx)
        {
            this._ctx = ctx;
            _set = _ctx.Set<T>();

        }

        public int Commit()
        {
            return _ctx.SaveChanges();
        }

        public void Add(T obj)
        {
            _set.Add(obj);
        }

        public IEnumerable<T> FindAll()
        {
            return _set.ToList();
        }

        public T FindbyId(string id)
        {
            return _set.Find(id);
        }
    }
}
