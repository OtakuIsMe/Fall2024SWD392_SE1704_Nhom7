using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BE.src.Domains.Database;
using BE.src.Domains.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.src.Repositories
{
    public interface IReportRepo
    {
        Task<List<RatingFeedback>?> GetReports();
    }

    public class ReportRepo : IReportRepo
    {
        private readonly PodDbContext _context;
        public ReportRepo(PodDbContext context)
        {
            _context = context;
        }

        public async Task<List<RatingFeedback>?> GetReports()
        {
            return await _context.RatingFeedbacks.ToListAsync();
        }
    }
}