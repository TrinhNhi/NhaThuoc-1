using Dapper;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Statistic;
using WebFilm.Core.Enitites.Supplier;
using WebFilm.Core.Enitites.User;
using WebFilm.Core.Interfaces.Repository;

namespace WebFilm.Infrastructure.Repository
{
    public class SupplierRepository : BaseRepository<int, Suppliers>, ISupplierRepository
    {
        public SupplierRepository(IConfiguration configuration) : base(configuration)
        {
        }
            public BaseStatistic getStatistic()
            {
                using (SqlConnection = new MySqlConnection(_connectionString))
                {
                    var sqlCommand = $@"Select `status`, count(*) as total from `Suppliers` group by `status`;";
                    var res = SqlConnection.QueryFirstOrDefault<BaseStatistic>(sqlCommand);

                    SqlConnection.Close();
                    return res;
                }
            }
    }
}
