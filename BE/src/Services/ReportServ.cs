using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BE.src.Domains.Models;
using BE.src.Repositories;
using BE.src.Shared.Type;
using Microsoft.AspNetCore.Mvc;

namespace BE.src.Services
{
    public interface IReportServ
    {
        Task<IActionResult> ViewAllReports();
    }

    public class ReportServ : IReportServ
    {
        private readonly IReportRepo _reportRepo;
        public ReportServ(IReportRepo reportRepo)
        {
            _reportRepo = reportRepo;
        }

        public async Task<IActionResult> ViewAllReports()
        {
            var reports = await _reportRepo.GetReports();
            if (reports == null)
            {
                return ErrorResp.NotFound("Not found reports");
            }
            else
            {
                return SuccessResp.Ok(reports);
            }
        }
    }
}