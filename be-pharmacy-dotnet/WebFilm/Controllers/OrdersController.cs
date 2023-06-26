using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebFilm.Core.Enitites.Drug;
using WebFilm.Core.Enitites.Order;
using WebFilm.Core.Interfaces.Services;
using WebFilm.Core.Services;

namespace WebFilm.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : BaseController<int, Orders>
    {
        #region Field
        IOrderService _orderService;
        IUserContext _userContext;

        #endregion

        public OrdersController(IOrderService orderService, IUserContext userContext) : base(orderService)
        {
            _orderService = orderService;
            _userContext = userContext;
        }

        [HttpPost("")]
        [AllowAnonymous]
        public IActionResult create(OrderCreateDTO dto)
        {
            try
            {
                var res = _orderService.create(dto);
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
                var res = _orderService.getAll();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpPost("{id}/pack")]
        public IActionResult pack(int id)
        {
            try
            {
                var res = _orderService.pack(id);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
    }
}
