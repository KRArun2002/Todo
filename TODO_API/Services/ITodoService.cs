using TODO_API.Models;

namespace TODO_API.Services
{
    public interface ITodoService
    {
        // TodoList operations
        IEnumerable<TodoList> GetAllLists();
        TodoList? GetListById(int id);
        TodoList CreateList(TodoList todoList);
        TodoList? UpdateList(int id, TodoList todoList);
        bool DeleteList(int id);

        // TodoItem operations
        IEnumerable<TodoItem> GetAllItems();
        IEnumerable<TodoItem> GetItemsByListId(int listId);
        TodoItem? GetItemById(int id);
        TodoItem CreateItem(TodoItem todoItem);
        TodoItem? UpdateItem(int id, TodoItem todoItem);
        TodoItem? ToggleItemCompletion(int id);
        bool DeleteItem(int id);
    }
}