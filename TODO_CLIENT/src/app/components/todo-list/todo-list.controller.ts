import { Component, OnInit, signal } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent implements OnInit {
  tasks = signal<Task[]>([]);

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTasks().subscribe({
      next: (data) => this.tasks.set(data),
      error: (err) => console.error('Error fetching tasks', err)
    });
  }
}