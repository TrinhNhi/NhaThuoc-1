using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Supplier;
using WebFilm.Core.Enitites.User;
using WebFilm.Core.Exceptions;
using WebFilm.Core.Interfaces.Repository;
using WebFilm.Core.Interfaces.Services;

namespace WebFilm.Core.Services
{
    public class SupplierService : BaseService<int, Suppliers>, ISupplierService
    {
        ISupplierRepository _supplierRepository;
        IUserContext _userContext;
        private readonly IConfiguration _configuration;

        public SupplierService(ISupplierRepository supplierRepository,
            IConfiguration configuration,
            IUserContext userContext) : base(supplierRepository)
        {
            _configuration = configuration;
            _supplierRepository = supplierRepository;
            _userContext = userContext;
        }

        public bool create(SupplierDTO dto)
        {
            Suppliers sup = new Suppliers();
            sup.address = dto.address;
            sup.name = dto.name;
            sup.phone = dto.phone;
            
            _supplierRepository.Add(sup);
            return true;
        }

        public bool update(int id, SupplierDTO dto)
        {
            Suppliers sup = _supplierRepository.GetByID(id);
            if (sup == null)
            {
                throw new ServiceException("Không tìm thấy Supplier");
            }

            sup.name = dto.name;
            sup.phone = dto.phone;
            sup.address = dto.address;
            _supplierRepository.Edit(id, sup);

            return true;
        }

        public bool action(int id)
        {
            Suppliers sup = _supplierRepository.GetByID(id);
            if (sup == null)
            {
                throw new ServiceException("Không tìm thấy Supplier");
            }
            if (sup.status.Equals("ACTIVE"))
            {
                sup.status = "INACTIVE";
            } else
            {
                sup.status = "ACTIVE";
            }
            _supplierRepository.Edit(id, sup);

            return true;
        }
    }
}
