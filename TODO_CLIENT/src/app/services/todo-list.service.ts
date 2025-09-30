import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  TodoList, 
} from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private apiUrl = 'http://localhost:5216/api/todolist';

  constructor(private http: HttpClient) {}

  getAllLists(): Observable<TodoList[]> {
    return this.http.get<TodoList[]>(this.apiUrl);
  }

  createList(list: Omit<TodoList, 'id' | 'createdAt'>): Observable<TodoList> {
    return this.http.post<TodoList>(this.apiUrl, list);
  }

  deleteList(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}