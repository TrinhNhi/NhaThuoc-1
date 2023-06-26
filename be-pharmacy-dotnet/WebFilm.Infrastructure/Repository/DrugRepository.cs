using Dapper;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Drug;
using WebFilm.Core.Enitites.Property;
using WebFilm.Core.Enitites.Statistic;
using WebFilm.Core.Interfaces.Repository;

namespace WebFilm.Infrastructure.Repository
{
    public class DrugRepository : BaseRepository<int, Drugs>, IDrugRepository
    {
        public DrugRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public Drugs create(DrugDTO dto, int propertyID)
        {
            using (SqlConnection = new MySqlConnection(_connectionString))
            {
                var sqlCommand = $@"INSERT INTO `Drugs` (name, qty, price, `condition`, status, image, createdDate, modifiedDate, propertyID, exp, isPrescription)
                                              VALUES (@v_name, @v_qty, @v_price , @v_condition, 'OK', @v_image, NOW(), NOW(), @v_propertyID, @v_exp, @v_isPrescription);";
                using (MySqlCommand command = new MySqlCommand(sqlCommand, SqlConnection))
                {
                    command.Parameters.AddWithValue("@v_name", dto.name);
                    command.Parameters.AddWithValue("@v_qty", dto.qty);
                    command.Parameters.AddWithValue("@v_price", dto.price);
                    command.Parameters.AddWithValue("@v_condition", dto.condition);
                    command.Parameters.AddWithValue("@v_image", dto.image);
                    command.Parameters.AddWithValue("@v_propertyID", propertyID);
                    command.Parameters.AddWithValue("@v_exp", dto.exp.GetValueOrDefault().AddHours(7));
                    command.Parameters.AddWithValue("@v_isPrescription", dto.isPrescription);

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

        public BaseStatistic getStatistic()
        {
            using (SqlConnection = new MySqlConnection(_connectionString))
            {
                var sqlCommand = $@"Select `status`, count(*) as total from `Drugs` group by `status`;";
                var res = SqlConnection.QueryFirstOrDefault<BaseStatistic>(sqlCommand);

                SqlConnection.Close();
                return res;
            }
        }

        public int update(int id, DrugDTO dto)
        {
            using (SqlConnection = new MySqlConnection(_connectionString))
            {
                var sqlCommand = $@"Update `Drugs` set name = @v_name, qty = @v_qty, price = @v_price, `condition` = @v_condition, image = @v_image, ModifiedDate = NOW(), propertyID = @v_propertyID, isPrescription = @v_isPrescription where id = @v_id;";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("v_name", dto.name);
                parameters.Add("v_qty", dto.qty);
                parameters.Add("v_price", dto.price);
                parameters.Add("v_condition", dto.condition);
                parameters.Add("v_image", dto.image);
                parameters.Add("v_id", id);
                parameters.Add("v_propertyID", dto.propertyID);
                parameters.Add("v_isPrescription", dto.isPrescription);

                var affectedRows = SqlConnection.Execute(sqlCommand, parameters);

                SqlConnection.Close();
                return affectedRows;
            }
        }
    }
}
