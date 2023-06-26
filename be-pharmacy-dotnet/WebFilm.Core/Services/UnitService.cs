using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Supplier;
using WebFilm.Core.Enitites.Unit;
using WebFilm.Core.Exceptions;
using WebFilm.Core.Interfaces.Repository;
using WebFilm.Core.Interfaces.Services;

namespace WebFilm.Core.Services
{
    public class UnitService : BaseService<int, Units>, IUnitService
    {
        IUnitRepository _unitRepository;
        IUserContext _userContext;
        private readonly IConfiguration _configuration;

        public UnitService(IUnitRepository unitRepository,
            IConfiguration configuration,
            IUserContext userContext) : base(unitRepository)
        {
            _configuration = configuration;
            _unitRepository = unitRepository;
            _userContext = userContext;
        }

        public bool create(UnitDTO dto)
        {
            Units unit = new Units();
            unit.parentID = dto.parentID;
            unit.name = dto.name;
            _unitRepository.Add(unit);
            return true;
        }

        public bool update(int id, UnitDTO dto)
        {
            Units unit = _unitRepository.GetByID(id);
            if (unit == null)
            {
                throw new ServiceException("Không tìm thấy Unit");
            }

            unit.parentID = dto.parentID;
            unit.name = dto.name;
            _unitRepository.Edit(id, unit);
            return true;
        }
    }
}
