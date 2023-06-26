using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebFilm.Core.Enitites.Drug;
using WebFilm.Core.Enitites.Property;
using WebFilm.Core.Interfaces.Services;
using WebFilm.Core.Services;

namespace WebFilm.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DrugsController : BaseController<int, Drugs>
    {
        #region Field
        IDrugService _drugService;
        IUserContext _userContext;

        #endregion

        #region Contructor
        public DrugsController(IDrugService drugService, IUserContext userContext) : base(drugService)
        {
            _drugService = drugService;
            _userContext = userContext;
        }

        [HttpPost("")]
        [AllowAnonymous]
        public IActionResult create(DrugDTO dto)
        {
            try
            {
                var res = _drugService.create(dto);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpPut("{id}")]
        public IActionResult update(int id, DrugDTO dto)
        {
            try
            {
                var res = _drugService.update(id, dto);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }


        [HttpPut("{id}/actions")]
        public IActionResult action(int id)
        {
            try
            {
                var res = _drugService.action(id);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpPost("search")]
        [AllowAnonymous]
        public IActionResult search([FromBody] DrugSearch dto)
        {
            try
            {
                var res = _drugService.search(dto.url);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
        #endregion
    }
}
