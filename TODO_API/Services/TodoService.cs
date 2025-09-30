using TODO_API.Models;

namespace TODO_API.Services
{
    public class TodoService : ITodoService
    {
        private readonly List<TodoList> _todoLists = new();
        private readonly List<TodoItem> _todoItems = new();
        private int _nextListId = 1;
        private int _nextItemId = 1;

        // TodoList operations
        public IEnumerable<TodoList> GetAllLists()
        {
            return _todoLists.OrderBy(l => l.CreatedAt);
        }

        public TodoList? GetListById(int id)
        {
            return _todoLists.FirstOrDefault(l => l.Id == id);
        }

        public TodoList CreateList(TodoList todoList)
        {
            todoList.Id = _nextListId++;
            todoList.CreatedAt = DateTime.Now;
            _todoLists.Add(todoList);
            return todoList;
        }

        public TodoList? UpdateList(int id, TodoList todoList)
        {
            var existingList = _todoLists.FirstOrDefault(l => l.Id == id);
            if (existingList == null)
                return null;

            existingList.Name = todoList.Name;
            return existingList;
        }

        public bool DeleteList(int id)
        {
            var list = _todoLists.FirstOrDefault(l => l.Id == id);
            if (list == null)
                return false;

            _todoItems.RemoveAll(i => i.ListId == id);
            _todoLists.Remove(list);
            return true;
        }

        // TodoItem operations
        public IEnumerable<TodoItem> GetAllItems()
        {
            return _todoItems
                .OrderBy(i => i.Date)
                .ThenBy(i => string.IsNullOrEmpty(i.Time) ? 1 : 0)
                .ThenBy(i => i.Time);
        }

        public IEnumerable<TodoItem> GetItemsByListId(int listId)
        {
            return _todoItems
                .Where(i => i.ListId == listId)
                .OrderBy(i => i.Date)
                .ThenBy(i => string.IsNullOrEmpty(i.Time) ? 1 : 0)
                .ThenBy(i => i.Time);
        }

        public TodoItem? GetItemById(int id)
        {
            return _todoItems.FirstOrDefault(i => i.Id == id);
        }

        public TodoItem CreateItem(TodoItem todoItem)
        {
            todoItem.Id = _nextItemId++;
            todoItem.CreatedAt = DateTime.Now;
            _todoItems.Add(todoItem);
            return todoItem;
        }

        public TodoItem? UpdateItem(int id, TodoItem todoItem)
        {
            var existingItem = _todoItems.FirstOrDefault(i => i.Id == id);
            if (existingItem == null)
                return null;

            existingItem.Title = todoItem.Title;
            existingItem.Date = todoItem.Date;
            existingItem.Time = todoItem.Time;
            existingItem.Priority = todoItem.Priority;
            existingItem.Tag = todoItem.Tag;
            existingItem.ListId = todoItem.ListId;

            return existingItem;
        }

        public bool DeleteItem(int id)
        {
            var item = _todoItems.FirstOrDefault(i => i.Id == id);
            if (item == null)
                return false;

            _todoItems.Remove(item);
            return true;
        }

        public TodoItem? ToggleItemCompletion(int id)
        {
            var item = _todoItems.FirstOrDefault(i => i.Id == id);
            if (item == null)
                return null;

            item.IsCompleted = !item.IsCompleted;
            return item;
        }
    }
}