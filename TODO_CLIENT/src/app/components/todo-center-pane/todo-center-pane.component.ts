import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  TodoItem, 
  FilterCriteria, 
  SortBy,
} from '../../models/todo.model';

@Component({
  selector: 'app-todo-center-pane',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-center-pane.component.html',
  styleUrls: ['./todo-center-pane.component.css']
})
export class TodoCenterPaneComponent {
  @Input() todoItems: TodoItem[] = [];
  @Input() selectedListId: number | null = null;
  @Input() filterCriteria: FilterCriteria = {};
  @Input() sortBy: SortBy = 'date';
  @Output() itemAdded = new EventEmitter<Omit<TodoItem, 'id' | 'listId'>>();
  @Output() itemDeleted = new EventEmitter<number>();
  @Output() itemToggled = new EventEmitter<number>();

  isAddingItem = signal(false);
  newItemTitle = signal('');
  newItemDate = signal('');
  newItemTime = signal('');
  newItemPriority = signal<'Low' | 'Medium' | 'High'>('Medium');
  newItemTag = signal('');

  get filteredAndSortedItems(): TodoItem[] {
    let items = this.todoItems.filter(item => item.listId === this.selectedListId);

    // Apply filters
    if (this.filterCriteria.priority) {
      items = items.filter(item => item.priority === this.filterCriteria.priority);
    }
    if (this.filterCriteria.tag) {
      items = items.filter(item => item.tag.toLowerCase() === this.filterCriteria.tag?.toLowerCase());
    }
    if (this.filterCriteria.date) {
      items = items.filter(item => 
        new Date(item.date).toDateString() === new Date(this.filterCriteria.date!).toDateString()
      );
    }

    // Apply sorting
    return items.sort((a, b) => {
      if (this.sortBy === 'date') {
        // First sort by date
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        
        if (dateA !== dateB) {
          return dateA - dateB;
        }
        
        // If dates are equal, sort by time
        const hasTimeA = !!a.time;
        const hasTimeB = !!b.time;
        
        if (hasTimeA && !hasTimeB) {
          return -1;
        }
        if (!hasTimeA && hasTimeB) {
          return 1;
        }
        if (hasTimeA && hasTimeB) {
          return a.time!.localeCompare(b.time!);
        }
        
        return 0;
      } else {
        const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
    });
  }

  hasActiveFilters(): boolean {
    return !!(this.filterCriteria.priority || this.filterCriteria.tag || this.filterCriteria.date);
  }

  formatFilterDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }
  
  startAddingItem(): void {
    this.isAddingItem.set(true);
  }

  addItem(): void {
    console.log('called')
    const title = this.newItemTitle().trim();
    const date = this.newItemDate();
    const time = this.newItemTime().trim();

    if (title && date) {
      this.itemAdded.emit({
        title,
        date: new Date(date),
        time: time || undefined,
        priority: this.newItemPriority(),
        tag: this.newItemTag().trim()
      });
      this.resetForm();
    }
  }

  cancelAddItem(): void {
    this.resetForm();
  }

  deleteItem(itemId: number): void {
    this.itemDeleted.emit(itemId);
  }

  toggleItem(itemId: number): void {
    this.itemToggled.emit(itemId);
  }

  private resetForm(): void {
    this.newItemTitle.set('');
    this.newItemDate.set('');
    this.newItemTime.set('');
    this.newItemPriority.set('Medium');
    this.newItemTag.set('');
    this.isAddingItem.set(false);
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority.toLowerCase()}`;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}