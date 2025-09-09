import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  private username = "Testuser";
  private http = inject(HttpClient);

  private todoId = 1;
  private todoList: Todo[] = [
    {
      id: this.todoId++,
      title: 'serve the app',
      completed: true,
    },
    {
      id: this.todoId++,
      title: 'familiarise yourself with the codebase',
      completed: false,
    },
    {
      id: this.todoId++,
      title: 'start talking to the api',
      completed: false,
    },
  ];

  refreshTodos() : void {
    this.todos = this.GetTodos();
  }

  // TODO replace with a get request
  public GetTodos() : Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}/${this.username}/todo`);
  }
  todos = this.GetTodos();

  public addTodo(title : String): Observable<Todo> {
    // TODO: replace with a POST request
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    var response = this.http.post<Todo>(`${environment.apiUrl}/${this.username}/todo`, todo)
    return response
  }

  public findById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${environment.apiUrl}/${this.username}/todo/${id}`)
  }

  public updateTodo(updatedTodo: Todo): Observable<Todo> {
    // TODO: replace with a PUT request
    const foundTodo = this.findById(updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    Object.assign(foundTodo, updatedTodo);
    return this.http.put<Todo>(`${environment.apiUrl}/${this.username}/todo/${updatedTodo.id}`, foundTodo)

    // return foundTodo;
  }
}
