import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  TodoList, 
} from '../../models/todo.model';

@Component({
  selector: 'app-todo-left-pane',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-left-pane.component.html',
  styleUrls: ['./todo-left-pane.component.css']
})

export class TodoLeftPaneComponent {
  @Input() todoLists: TodoList[] = [];
  @Input() selectedListId: number | null = null;
  @Output() listSelected = new EventEmitter<number>();
  @Output() listAdded = new EventEmitter<string>();
  @Output() listDeleted = new EventEmitter<number>();

  newListName = signal('');
  isAddingList = signal(false);

  selectList(listId: number): void {
    this.listSelected.emit(listId);
  }

  startAddingList(): void {
    this.isAddingList.set(true);
  }

  addList(): void {
    const name = this.newListName().trim();
    if (name) {
      this.listAdded.emit(name);
      this.newListName.set('');
      this.isAddingList.set(false);
    }
  }

  cancelAddList(): void {
    this.newListName.set('');
    this.isAddingList.set(false);
  }

  deleteList(event: Event, listId: number): void {
    event.stopPropagation();
    this.listDeleted.emit(listId);
  }
}