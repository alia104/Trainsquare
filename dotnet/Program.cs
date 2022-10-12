using System;
using System.Data.SqlClient;

namespace Trainsquare.Db.ConsoleApp
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            string connString = "Server=.;Database=MyNewDB;Trusted_Connection=True;";

            bool isConnected = IsServerConnected(connString);
            Console.WriteLine("DB isConnected = {0}", isConnected);
        }

        private static bool IsServerConnected(string connectionString)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    return true;
                }
                catch (SqlException ex)
                {
                    Console.WriteLine(ex.Message);
                    return false;
                }
            }
        }
    }
}
