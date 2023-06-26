using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebFilm.Core.Enitites.Property;
using WebFilm.Core.Enitites.Supplier;
using WebFilm.Core.Exceptions;
using WebFilm.Core.Interfaces.Repository;
using WebFilm.Core.Interfaces.Services;

namespace WebFilm.Core.Services
{
    public class PropertyService : BaseService<int, Properties>, IPropertyService
    {
        IPropertyRepository _propertyRepository;
        IUserContext _userContext;
        private readonly IConfiguration _configuration;

        public PropertyService(IPropertyRepository propertyRepository,
            IConfiguration configuration,
            IUserContext userContext) : base(propertyRepository)
        {
            _configuration = configuration;
            _propertyRepository = propertyRepository;
            _userContext = userContext;
        }

        public bool create(PropertyDTO dto)
        {
            Properties properties = new Properties();
            properties.bottlesPerBin = dto.bottlesPerBin;
            properties.boxesPerBin = dto.boxesPerBin;
            properties.pillsPerPack = dto.pillsPerPack;
            properties.packsPerBox = dto.packsPerBox;

            _propertyRepository.Add(properties);
            return true;
        }

        public bool update(int id, PropertyDTO dto)
        {
            Properties properties = _propertyRepository.GetByID(id);
            if (properties == null)
            {
                throw new ServiceException("Không tìm thấy Property");
            }

            properties.bottlesPerBin = dto.bottlesPerBin;
            properties.boxesPerBin = dto.boxesPerBin;
            properties.pillsPerPack = dto.pillsPerPack;
            properties.packsPerBox = dto.packsPerBox;

            _propertyRepository.Edit(id, properties);
            return true;
        }
    }
}
