namespace TODO_API.Models
{
    public class TodoItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string? Time { get; set; } = string.Empty;
        public string Priority { get; set; } = "Medium"; // Low, Medium, High
        public string Tag { get; set; } = string.Empty;
        public int ListId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public bool IsCompleted { get; set; } = false;
    }
}