using Dapper;
using MailKit.Search;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Drug;
using WebFilm.Core.Interfaces.Repository;

namespace WebFilm.Infrastructure.Repository
{
    public class SupplierDrugRepository : BaseRepository<int, SupplierDrugs>, ISupplierDrugRepository
    {
        public SupplierDrugRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public SupplierDrugs GetSupplierDrugs(int drugID)
        {
            using (SqlConnection = new MySqlConnection(_connectionString))
            {
                var sqlCommand = $@"Select * from `SupplierDrugs` where drugID = @v_drugID;";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("v_drugID", drugID);
                var res = SqlConnection.QueryFirstOrDefault<SupplierDrugs>(sqlCommand, parameters);

                SqlConnection.Close();
                return res;
            }
        }
    }
}
