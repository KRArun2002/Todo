import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  FilterCriteria, 
  SortBy,
} from '../../models/todo.model';

@Component({
  selector: 'app-todo-right-pane',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-right-pane.component.html',
  styleUrls: ['./todo-right-pane.component.css']
})
export class TodoRightPaneComponent {
  @Output() filterChanged = new EventEmitter<FilterCriteria>();
  @Output() sortChanged = new EventEmitter<SortBy>();

  filterPriority = signal<'Low' | 'Medium' | 'High' | ''>('');
  filterTag = signal('');
  filterDate = signal('');
  sortBy = signal<SortBy>('date');

  onFilterPriorityChange(): void {
    this.emitFilterChange();
  }

  onFilterTagChange(): void {
    this.emitFilterChange();
  }

  onFilterDateChange(): void {
    this.emitFilterChange();
  }

  selectSort(sortBy: SortBy): void {
    this.sortBy.set(sortBy);
    this.sortChanged.emit(sortBy);
  }

  clearFilters(): void {
    this.filterPriority.set('');
    this.filterTag.set('');
    this.filterDate.set('');
    this.emitFilterChange();
  }

  private emitFilterChange(): void {
    const criteria: FilterCriteria = {};
    
    if (this.filterPriority()) {
      criteria.priority = this.filterPriority() as 'Low' | 'Medium' | 'High';
    }
    if (this.filterTag().trim()) {
      criteria.tag = this.filterTag().trim();
    }
    if (this.filterDate()) {
      criteria.date = new Date(this.filterDate());
    }

    this.filterChanged.emit(criteria);
  }
}