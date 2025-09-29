using Microsoft.AspNetCore.Mvc;
using TODO_API.Models;

namespace TODO_API.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class TaskController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<TaskItem>> GetTasks()
        {
            var tasks = new List<TaskItem>
            {
                new TaskItem { Id = 1, TaskName = "Learn Angular" },
                new TaskItem { Id = 2, TaskName = "Build .NET API" },
                new TaskItem { Id = 3, TaskName = "Integrate frontend & backend" }
            };

            return Ok(tasks);
        }
    }
}