using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Trainsquare.Models;
using Trainsquare.Models.Domain;
using Trainsquare.Services;
using Trainsquare.Web.Controllers;
using Trainsquare.Web.Models.Responses;
using System;

namespace Trainsquare.Web.Api.Controllers
{
    [Route("api/dashboard/")]
    [ApiController]
    public class UsersApiController : BaseApiController
    {
        private IUsersService _service = null;
        private IAuthenticationService<int> _authService = null;

        public UsersApiController(IUsersService service
            , ILogger<UsersApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;

        }
        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<User>>> Paginate(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<User> page = _service.Paginate(pageIndex, pageSize);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<User>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }
    }
}