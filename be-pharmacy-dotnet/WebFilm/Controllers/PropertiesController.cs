using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebFilm.Core.Enitites.Property;
using WebFilm.Core.Enitites.Supplier;
using WebFilm.Core.Interfaces.Services;
using WebFilm.Core.Services;

namespace WebFilm.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PropertiesController : BaseController<int, Properties>
    {
        #region Field
        IPropertyService _propertyService;
        IUserContext _userContext;

        #endregion

        #region Contructor
        public PropertiesController(IPropertyService propertyService, IUserContext userContext) : base(propertyService)
        {
            _propertyService = propertyService;
            _userContext = userContext;
        }
        #endregion

        [HttpPost("")]
        public IActionResult create(PropertyDTO dto)
        {
            try
            {
                var res = _propertyService.create(dto);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpPut("{id}")]
        public IActionResult update(int id, PropertyDTO dto)
        {
            try
            {
                var res = _propertyService.update(id, dto);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("")]
        [AllowAnonymous]
        public IActionResult getAll()
        {
            try
            {
                var res = _propertyService.GetAll();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
    }
}
