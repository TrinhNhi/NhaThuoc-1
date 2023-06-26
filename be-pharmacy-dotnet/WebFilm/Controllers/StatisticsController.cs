using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebFilm.Core.Interfaces.Services;
using WebFilm.Core.Services;

namespace WebFilm.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        #region Field
        IStatisticService _statisticService;
        IUserContext _userContext;

        #endregion

        public StatisticsController(IStatisticService statisticService, IUserContext userContext)
        {
            _statisticService = statisticService;
            _userContext = userContext;
        }

        [HttpGet("")]
        public IActionResult getAll()
        {
                var res = _statisticService.GetStatistic();
                return Ok(res);
        }
    }
}
