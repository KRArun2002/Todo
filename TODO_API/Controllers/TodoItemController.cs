using Microsoft.AspNetCore.Mvc;
using TODO_API.Models;
using TODO_API.Services;

namespace TODO_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoItemController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodoItemController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        // GET: api/todoitem
        [HttpGet]
        public ActionResult<IEnumerable<TodoItem>> GetAllItems()
        {
            var items = _todoService.GetAllItems();
            return Ok(items);
        }

        // GET: api/todoitem/list/{listId}
        [HttpGet("list/{listId}")]
        public ActionResult<IEnumerable<TodoItem>> GetItemsByListId(int listId)
        {
            var items = _todoService.GetItemsByListId(listId);
            return Ok(items);
        }

        // GET: api/todoitem/{id}
        [HttpGet("{id}")]
        public ActionResult<TodoItem> GetItemById(int id)
        {
            var item = _todoService.GetItemById(id);
            if (item == null)
                return NotFound($"Todo item with ID {id} not found.");

            return Ok(item);
        }

        // POST: api/todoitem
        [HttpPost]
        public ActionResult<TodoItem> CreateItem([FromBody] TodoItem todoItem)
        {
            if (string.IsNullOrWhiteSpace(todoItem.Title))
                return BadRequest("Item title is required.");

            if (todoItem.ListId <= 0)
                return BadRequest("Valid list ID is required.");

            // Validate priority
            var validPriorities = new[] { "Low", "Medium", "High" };
            if (!validPriorities.Contains(todoItem.Priority))
                return BadRequest("Priority must be Low, Medium, or High.");

            var createdItem = _todoService.CreateItem(todoItem);
            return CreatedAtAction(nameof(GetItemById), new { id = createdItem.Id }, createdItem);
        }

        // PUT: api/todoitem/{id}
        [HttpPut("{id}")]
        public ActionResult<TodoItem> UpdateItem(int id, [FromBody] TodoItem todoItem)
        {
            if (string.IsNullOrWhiteSpace(todoItem.Title))
                return BadRequest("Item title is required.");

            if (todoItem.ListId <= 0)
                return BadRequest("Valid list ID is required.");

            // Validate priority
            var validPriorities = new[] { "Low", "Medium", "High" };
            if (!validPriorities.Contains(todoItem.Priority))
                return BadRequest("Priority must be Low, Medium, or High.");

            var updatedItem = _todoService.UpdateItem(id, todoItem);
            if (updatedItem == null)
                return NotFound($"Todo item with ID {id} not found.");

            return Ok(updatedItem);
        }

        // PATCH: api/todoitem/{id}/toggle
        [HttpPatch("{id}/toggle")]
        public ActionResult<TodoItem> ToggleCompletion(int id)
        {
            var item = _todoService.ToggleItemCompletion(id);
            if (item == null)
                return NotFound($"Todo item with ID {id} not found.");

            return Ok(item);
        }

        // DELETE: api/todoitem/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteItem(int id)
        {
            var result = _todoService.DeleteItem(id);
            if (!result)
                return NotFound($"Todo item with ID {id} not found.");

            return NoContent();
        }
    }
}