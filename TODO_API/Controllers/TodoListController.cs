using Microsoft.AspNetCore.Mvc;
using TODO_API.Models;
using TODO_API.Services;

namespace TODO_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoListController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodoListController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        // GET: api/todolist
        [HttpGet]
        public ActionResult<IEnumerable<TodoList>> GetAllLists()
        {
            var lists = _todoService.GetAllLists();
            return Ok(lists);
        }

        // GET: api/todolist/{id}
        [HttpGet("{id}")]
        public ActionResult<TodoList> GetListById(int id)
        {
            var list = _todoService.GetListById(id);
            if (list == null)
                return NotFound($"Todo list with ID {id} not found.");

            return Ok(list);
        }

        // POST: api/todolist
        [HttpPost]
        public ActionResult<TodoList> CreateList([FromBody] TodoList todoList)
        {
            if (string.IsNullOrWhiteSpace(todoList.Name))
                return BadRequest("Name is required for list.");

            var createdList = _todoService.CreateList(todoList);
            return CreatedAtAction(nameof(GetListById), new { id = createdList.Id }, createdList);
        }

        // PUT: api/todolist/{id}
        [HttpPut("{id}")]
        public ActionResult<TodoList> UpdateList(int id, [FromBody] TodoList todoList)
        {
            if (string.IsNullOrWhiteSpace(todoList.Name))
                return BadRequest("List name is required.");

            var updatedList = _todoService.UpdateList(id, todoList);
            if (updatedList == null)
                return NotFound($"Todo list with ID {id} not found.");

            return Ok(updatedList);
        }

        // DELETE: api/todolist/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteList(int id)
        {
            var result = _todoService.DeleteList(id);
            if (!result)
                return NotFound($"Todo list with ID {id} not found.");

            return NoContent();
        }
    }
}