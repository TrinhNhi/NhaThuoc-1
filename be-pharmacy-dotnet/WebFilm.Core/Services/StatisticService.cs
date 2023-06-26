using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Order;
using WebFilm.Core.Enitites.Statistic;
using WebFilm.Core.Interfaces.Repository;
using WebFilm.Core.Interfaces.Services;

namespace WebFilm.Core.Services
{
    public class StatisticService : IStatisticService
    {
        IDrugRepository _drugRepository;
        ISupplierDrugRepository _supplierDrugRepository;
        ISupplierRepository _supplierRepository;
        IPropertyRepository _propertyRepository;
        IUserContext _userContext;
        IOrderRepository _orderRepository;
        IOrderDrugRepository _orderDrugRepository;
        private readonly IConfiguration _configuration;

        public StatisticService(IDrugRepository drugRepository,
            IConfiguration configuration,
            IUserContext userContext,
            ISupplierDrugRepository supplierDrugRepository,
            ISupplierRepository supplierRepository,
            IPropertyRepository propertyRepository,
            IOrderRepository orderRepository,
            IOrderDrugRepository orderDrugRepository)
        {
            _configuration = configuration;
            _drugRepository = drugRepository;
            _userContext = userContext;
            _propertyRepository = propertyRepository;
            _supplierDrugRepository = supplierDrugRepository;
            _supplierRepository = supplierRepository;
            _orderRepository = orderRepository;
            _orderDrugRepository = orderDrugRepository;
        }

        public StatisticResponse GetStatistic()
        {
            StatisticResponse res = new StatisticResponse();
            BaseStatistic drug = _drugRepository.getStatistic();
            BaseStatistic supplier = _supplierRepository.getStatistic();
            List<DrugOrderStatistic> drugOrder = _orderDrugRepository.GetStatistic();
            int totalOrder = _orderRepository.GetAll().ToList().Count();
            int totalPack = _orderRepository.totalUnPack().Count();

            res.totalOrder = totalOrder;
            res.drug = drug;
            res.supplier = supplier;
            res.drugOrder = drugOrder;
            res.totalPack = totalPack;

            return res;
        }
    }
}
