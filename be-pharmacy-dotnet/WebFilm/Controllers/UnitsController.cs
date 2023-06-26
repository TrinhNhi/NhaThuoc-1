using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebFilm.Core.Enitites.Supplier;
using WebFilm.Core.Enitites.Unit;
using WebFilm.Core.Interfaces.Services;
using WebFilm.Core.Services;

namespace WebFilm.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UnitsController : BaseController<int, Units>
    {
        #region Field
        IUnitService _unitService;
        IUserContext _userContext;

        #endregion

        #region Contructor
        public UnitsController(IUnitService unitService, IUserContext userContext) : base(unitService)
        {
            _unitService = unitService;
            _userContext = userContext;
        }
        #endregion

        [HttpPost("")]
        public IActionResult create(UnitDTO dto)
        {
            try
            {
                var res = _unitService.create(dto);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpPut("{id}")]
        public IActionResult update(int id, UnitDTO dto)
        {
            try
            {
                var res = _unitService.update(id, dto);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("")]
        public IActionResult getAll()
        {
            try
            {
                var res = _unitService.GetAll();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
    }
}
