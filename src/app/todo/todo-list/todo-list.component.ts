import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {}

  todos = this.todoService.todos;
  displays = false;

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe({
      next: (response) => {
        console.log('updated', response);
      }
    })
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title).subscribe({
      next: (response) => {
        console.log('added:', response);
        this.todoService.refreshTodos();
        this.todos = this.todoService.todos
      }
    });
    this.todos = this.todoService.todos;
  }

  changeShow(): void {
    this.displays = !this.displays;
    console.log(this.displays)
  }
}
