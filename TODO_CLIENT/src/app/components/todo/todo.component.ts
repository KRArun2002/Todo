import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoCenterPaneComponent } from '../todo-center-pane/todo-center-pane.component';
import { TodoLeftPaneComponent } from '../todo-left-pane/todo-left-pane.component';
import { TodoRightPaneComponent } from '../todo-right-pane/todo-right-pane.component';
import { TodoListService } from '../../services/todo-list.service';
import { TodoItemService } from '../../services/todo-item.service';
import { 
  TodoList, 
  TodoItem, 
  FilterCriteria, 
  SortBy,
} from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    TodoCenterPaneComponent,
    TodoLeftPaneComponent,
    TodoRightPaneComponent
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoListComponent implements OnInit {
  todoLists = signal<TodoList[]>([]);
  todoItems = signal<TodoItem[]>([]);
  selectedListId = signal<number | null>(null);
  filterCriteria = signal<FilterCriteria>({});
  sortBy = signal<SortBy>('date');

  constructor(
    private todoListService: TodoListService,
    private todoItemService: TodoItemService
  ) {}

  ngOnInit(): void {
    this.loadLists();
    this.loadAllItems();
  }

  private loadLists(): void {
    this.todoListService.getAllLists().subscribe({
      next: (lists) => this.todoLists.set(lists),
      error: (err) => console.error('Error loading lists', err)
    });
  }

  private loadAllItems(): void {
    this.todoItemService.getAllItems().subscribe({
      next: (items) => this.todoItems.set(items),
      error: (err) => console.error('Error loading items', err)
    });
  }

  onListSelected(listId: number): void {
    this.selectedListId.set(listId);
  }

  onListAdded(listName: string): void {
    this.todoListService.createList({ name: listName }).subscribe({
      next: (newList) => {
        this.todoLists.update(lists => [...lists, newList]);
      },
      error: (err) => console.error('Error creating list', err)
    });
  }

  onListDeleted(listId: number): void {
    if (!confirm('Are you sure you want to delete this list? All items in this list will also be deleted.')) {
      return;
    }

    this.todoListService.deleteList(listId).subscribe({
      next: () => {
        // Remove list from array
        this.todoLists.update(lists => lists.filter(l => l.id !== listId));
        
        // Remove all items belonging to this list
        this.todoItems.update(items => items.filter(i => i.listId !== listId));
        
        // Clear selection if deleted list was selected
        if (this.selectedListId() === listId) {
          this.selectedListId.set(null);
        }
      },
      error: (err) => console.error('Error deleting list', err)
    });
  }

  onItemAdded(item: Omit<TodoItem, 'id' | 'listId' | 'createdAt'>): void {
    const selectedId = this.selectedListId();
    if (selectedId === null) return;

    const newItem = {
      ...item,
      listId: selectedId
    };

    this.todoItemService.createItem(newItem).subscribe({
      next: (createdItem) => {
        this.todoItems.update(items => [...items, createdItem]);
      },
      error: (err) => console.error('Error creating item', err)
    });
  }

  onItemDeleted(itemId: number): void {
    if (!confirm('Are you sure you want to delete this todo item?')) {
      return;
    }
    this.todoItemService.deleteItem(itemId).subscribe({
      next: () => {
        this.todoItems.update(items => items.filter(i => i.id !== itemId));
      },
      error: (err) => console.error('Error deleting item', err)
    });
  }

  onItemToggled(itemId: number): void {
    this.todoItemService.toggleCompletion(itemId).subscribe({
      next: (updatedItem) => {
        this.todoItems.update(items => 
          items.map(item => item.id === itemId ? updatedItem : item)
        );
      },
      error: (err) => console.error('Error toggling item', err)
    });
  }

  onFilterChanged(criteria: FilterCriteria): void {
    this.filterCriteria.set(criteria);
  }

  onSortChanged(sortBy: SortBy): void {
    this.sortBy.set(sortBy);
  }
}