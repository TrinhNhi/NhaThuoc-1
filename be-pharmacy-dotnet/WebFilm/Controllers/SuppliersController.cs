using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebFilm.Core.Enitites.Supplier;
using WebFilm.Core.Enitites.User;
using WebFilm.Core.Interfaces.Services;
using WebFilm.Core.Services;

namespace WebFilm.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SuppliersController : BaseController<int, Suppliers>
    {
        #region Field
        ISupplierService _supplierService;
        IUserContext _userContext;

        #endregion

        #region Contructor
        public SuppliersController(ISupplierService supplierService, IUserContext userContext) : base(supplierService)
        {
            _supplierService = supplierService;
            _userContext = userContext;
        }
        #endregion

        [HttpPost("")]
        public IActionResult create(SupplierDTO dto)
        {
            try
            {
                var res = _supplierService.create(dto);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpPut("{id}")]
        public IActionResult update(int id, SupplierDTO dto)
        {
            try
            {
                var res = _supplierService.update(id, dto);
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
                var res = _supplierService.GetAll();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpPut("{id}/actions")]
        public IActionResult update(int id)
        {
            try
            {
                var res = _supplierService.action(id);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
    }
}
