using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BE.src.Services;
using Microsoft.AspNetCore.Mvc;

namespace BE.src.Controllers
{
    [ApiController]
    [Route("report/")]
    public class ReportController : ControllerBase
    {
        private readonly IReportServ _reportServ;
        public ReportController(IReportServ reportServ)
        {
            _reportServ = reportServ;
        }

        [HttpGet("view-all-reports")]
        public async Task<IActionResult> ViewAllReports()
        {
            return await _reportServ.ViewAllReports();
        }
    }
}