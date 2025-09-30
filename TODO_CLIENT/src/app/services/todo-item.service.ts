import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  TodoItem, 
} from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {
  private apiUrl = 'http://localhost:5216/api/todoitem';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl);
  }

  createItem(item: Omit<TodoItem, 'id' | 'createdAt'>): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.apiUrl, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleCompletion(id: number): Observable<TodoItem> {
    return this.http.patch<TodoItem>(`${this.apiUrl}/${id}/toggle`, {});
  }
}