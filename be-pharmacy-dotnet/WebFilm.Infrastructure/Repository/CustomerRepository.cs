using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Customer;
using WebFilm.Core.Enitites.Drug;
using WebFilm.Core.Interfaces.Repository;

namespace WebFilm.Infrastructure.Repository
{
    public class CustomerRepository : BaseRepository<int, Customers>, ICustomerRepository
    {
        public CustomerRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public Customers create(string name, string phone)
        {
            using (SqlConnection = new MySqlConnection(_connectionString))
            {
                var sqlCommand = $@"INSERT INTO `Customers` (name, phone, createdDate, modifiedDate)
                                              VALUES (@v_name, @v_phone, NOW(), NOW());";
                using (MySqlCommand command = new MySqlCommand(sqlCommand, SqlConnection))
                {
                    command.Parameters.AddWithValue("@v_name", name);
                    command.Parameters.AddWithValue("@v_phone", phone);

                    SqlConnection.Open();
                    command.ExecuteNonQuery();
                    int insertedId = (int)command.LastInsertedId;
                    // Lấy lại đối tượng vừa chèn
                    var insertedObject = GetByID(insertedId);
                    SqlConnection.Close();
                    return insertedObject;
                }
            }
        }
    }
}
