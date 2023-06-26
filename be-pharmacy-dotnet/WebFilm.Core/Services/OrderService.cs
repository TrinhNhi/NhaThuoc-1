using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Customer;
using WebFilm.Core.Enitites.Drug;
using WebFilm.Core.Enitites.Order;
using WebFilm.Core.Exceptions;
using WebFilm.Core.Interfaces.Repository;
using WebFilm.Core.Interfaces.Services;

namespace WebFilm.Core.Services
{
    public class OrderService : BaseService<int, Orders>, IOrderService
    {
        IOrderRepository _orderRepository;
        ISupplierDrugRepository _supplierDrugRepository;
        ISupplierRepository _supplierRepository;
        IPropertyRepository _propertyRepository;
        IUserContext _userContext;
        ICustomerRepository _customerRepository;
        IOrderDrugRepository _orderDrugRepository;
        IDrugRepository _drugRepository;
        private readonly IConfiguration _configuration;

        public OrderService(IOrderRepository orderRepository,
            IConfiguration configuration,
            IUserContext userContext,
            ISupplierDrugRepository supplierDrugRepository,
            ISupplierRepository supplierRepository,
            IPropertyRepository propertyRepository,
            ICustomerRepository customerRepository,
            IOrderDrugRepository orderDrugRepository,
            IDrugRepository drugRepository) : base(orderRepository)
        {
            _configuration = configuration;
            _orderRepository = orderRepository;
            _userContext = userContext;
            _propertyRepository = propertyRepository;
            _supplierDrugRepository = supplierDrugRepository;
            _supplierRepository = supplierRepository;
            _customerRepository = customerRepository;
            _orderDrugRepository = orderDrugRepository;
            _drugRepository = drugRepository;
        }

        public bool create(OrderCreateDTO dto)
        {
            List<OrderDTO> orderDTOS = dto.drugs;
            if (this.validateOrder(orderDTOS))
            {
                Customers customer = _customerRepository.create(dto.name, dto.phone);
                float price = dto.drugs.Sum(x => x.price);

                //order
                Orders order = _orderRepository.create(customer.id, price);

                //orderDrug
                foreach (OrderDTO orderDTO in orderDTOS)
                {
                    OrderDrugs orderDrugs = new OrderDrugs();
                    Drugs drug = _drugRepository.GetByID(orderDTO.drugID);
                    if (drug == null)
                    {
                        throw new ServiceException("Drug không hợp lệ");
                    }
                    if (orderDTO.qty > drug.qty)
                    {
                        throw new ServiceException("Mặt hàng không đủ số lượng");
                    }
                    orderDrugs.price = orderDTO.price;
                    orderDrugs.modifiedDate = DateTime.Now;
                    orderDrugs.createdDate = DateTime.Now;
                    orderDrugs.qty = orderDTO.qty;
                    orderDrugs.drugID = orderDTO.drugID;
                    orderDrugs.orderID = order.id;
                    _orderDrugRepository.Add(orderDrugs);

                    //drug
                    drug.qty = drug.qty - orderDTO.qty;
                    _drugRepository.Edit(drug.id, drug);
                }
            }

            return true;
        }

        public List<OrderResponse> getAll()
        {
            List<OrderResponse> res = new List<OrderResponse>();
            
            List<Orders> orders = _orderRepository.GetAll().ToList();

            foreach (Orders order in orders)
            {
                OrderResponse orderDTO = new OrderResponse();
                List<DrugsInfo> drugs = new List<DrugsInfo>();
                Customers customer = _customerRepository.GetByID(order.customerID);
                if (customer != null)
                {
                    orderDTO.customer = customer;
                }
                List<OrderDrugs> orderDrugs = _orderDrugRepository.GetAll().Where(p => p.orderID == order.id).ToList();
                foreach (OrderDrugs drug in orderDrugs)
                {
                    DrugsInfo info = new DrugsInfo();
                    Drugs d = _drugRepository.GetByID(drug.drugID);
                    if (d != null)
                    {
                        info.id = d.id;
                        info.name = d.name;
                    }
                    info.price = drug.price;
                    info.qty = drug.qty;
                    drugs.Add(info);
                }

                orderDTO.id = order.id;
                orderDTO.amount = order.price;
                orderDTO.createdDate = order.createdDate;
                orderDTO.modifiedDate = order.modifiedDate;
                orderDTO.drugs = drugs;
                orderDTO.isPack = order.isPack;
                orderDTO.packer = order.packer;

                res.Add(orderDTO);
            }
            return res;
        }

        private bool validateOrder(List<OrderDTO> orderDTOS)
        {
            foreach (OrderDTO orderDTO in orderDTOS)
            {
                Drugs drug = _drugRepository.GetByID(orderDTO.drugID);
                if (drug == null)
                {
                    throw new ServiceException("Drug không hợp lệ");
                }
                if (orderDTO.qty > drug.qty)
                {
                    throw new ServiceException("Mặt hàng không đủ số lượng");
                }
            }
            return true;
        }

        public bool pack(int id)
        {
            Orders order = _orderRepository.GetByID(id);
            
            if (order == null)
            {
                throw new ServiceException("Order không tồn tại");
            }

            if (_userContext.UserName != null)
            {
                order.packer = _userContext.UserName;
            }
            order.isPack = true;
            _orderRepository.Edit(id, order);

            return true;
        }
    }
}
