using Dapper;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Drug;
using WebFilm.Core.Enitites.Order;
using WebFilm.Core.Interfaces.Repository;

namespace WebFilm.Infrastructure.Repository
{
    public class OrderRepository : BaseRepository<int, Orders>, IOrderRepository
    {
        public OrderRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public Orders create(int customerID, float price)
        {
            using (SqlConnection = new MySqlConnection(_connectionString))
            {
                var sqlCommand = $@"INSERT INTO `Orders` (customerID, price, createdDate, modifiedDate, isPack)
                                              VALUES (@v_customerID, @v_price, NOW(), NOW(), false);";
                using (MySqlCommand command = new MySqlCommand(sqlCommand, SqlConnection))
                {
                    command.Parameters.AddWithValue("@v_customerID", customerID);
                    command.Parameters.AddWithValue("@v_price", price);

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

        public List<Orders> totalUnPack()
        {
            using (SqlConnection = new MySqlConnection(_connectionString))
            {
                var sqlCommand = $@"Select * from `Orders` where isPack = false;";

                var res = SqlConnection.Query<Orders>(sqlCommand);

                SqlConnection.Close();
                return res.ToList();
            }
        }
    }
}
