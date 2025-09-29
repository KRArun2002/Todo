import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.controller';

export const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  { path: 'todos', component: TodoListComponent }
];