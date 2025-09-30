export interface TodoList {
  id: number;
  name: string;
  createdAt?: Date;
}

export interface TodoItem {
  id: number;
  title: string;
  date: Date;
  time?: string;
  priority: Priority;
  tag: string;
  listId: number;
  createdAt?: Date;
  isCompleted?: boolean;
}

export interface FilterCriteria {
  priority?: Priority;
  tag?: string;
  date?: Date;
}

export type Priority = 'Low' | 'Medium' | 'High';
export type SortBy = 'date' | 'priority';

