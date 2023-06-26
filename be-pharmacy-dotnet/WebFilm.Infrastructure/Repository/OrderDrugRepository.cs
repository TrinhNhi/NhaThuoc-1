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
using WebFilm.Core.Enitites.Statistic;
using WebFilm.Core.Interfaces.Repository;

namespace WebFilm.Infrastructure.Repository
{
    public class OrderDrugRepository : BaseRepository<int, OrderDrugs>, IOrderDrugRepository
    {
        public OrderDrugRepository(IConfiguration configuration) : base(configuration)
        {
           
        }
        public List<DrugOrderStatistic> GetStatistic()
        {
            using (SqlConnection = new MySqlConnection(_connectionString))
            {
                var sqlCommand = $@"SELECT d.id, d.name, sum(od.qty) as sold, d.qty as qty FROM `drugs` d
                                    join orderdrugs od on od.drugID = d.id
                                    GROUP BY d.id;";
                var res = SqlConnection.Query<DrugOrderStatistic>(sqlCommand);

                SqlConnection.Close();
                return res.ToList();
            }
        }
    }
}
