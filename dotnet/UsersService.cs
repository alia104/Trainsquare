using Trainsquare.Data;
using Trainsquare.Data.Providers;
using Trainsquare.Models;
using Trainsquare.Models.Domain;
using Trainsquare.Models.Requests;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Trainsquare.Services
{
    public class UsersService : IUsersService
    {
        IDataProvider _data = null;
        public UsersService(IDataProvider data)
        {
            _data = data;

        }
        public Paged<User> Paginate(int pageIndex, int pageSize)
        {
            Paged<User> pagedList = null;
            List<User> list = null;
            int totalCount = 0;

            string procName = "[dbo].[UserProfiles_SelectAll_V2]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@PageIndex", pageIndex);
                paramCollection.AddWithValue("@PageSize", pageSize);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                User aUser = MapUser(reader, ref startingIndex);
                totalCount = reader.GetSafeInt32(startingIndex++);


                if (list == null)
                {
                    list = new List<User>();
                }
                list.Add(aUser);
            });

            if (list != null)
            {
                pagedList = new Paged<User>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;

        }

        private static User MapUser(IDataReader reader, ref int startingIndex)
        {
            User aUser = new User();
            aUser.Status = new Status();

            aUser.Id = reader.GetSafeInt32(startingIndex++);
            aUser.AvatarUrl = reader.GetSafeString(startingIndex++);
            aUser.FirstName = reader.GetSafeString(startingIndex++);
            aUser.LastName = reader.GetSafeString(startingIndex++);
            aUser.Email = reader.GetSafeString(startingIndex++);
            aUser.Role = reader.DeserializeObject<List<Role>>(startingIndex++);
            aUser.Status.Name = reader.GetSafeString(startingIndex++);
            aUser.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aUser.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aUser;
        }
        
    }
}
