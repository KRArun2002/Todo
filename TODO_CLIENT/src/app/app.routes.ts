import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo/todo.component';

export const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  { path: 'todos', component: TodoListComponent }
];