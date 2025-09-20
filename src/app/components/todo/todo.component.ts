import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.sass'
})
export class TodoComponent {
  private todoService = inject(TodoService);
  protected readonly todos$ = this.todoService.todos$;
  
  protected newTodoTitle = signal('');
  protected newTodoDescription = signal('');
  protected editingTodo = signal<Todo | null>(null);
  protected editTitle = signal('');
  protected editDescription = signal('');


  protected async addTodo(): Promise<void> {
    const title = this.newTodoTitle().trim();
    const description = this.newTodoDescription().trim();
    
    if (!title) return;

    try {
      await this.todoService.addTodo({
        title,
        description: description || undefined,
        completed: false
      });
      
      this.newTodoTitle.set('');
      this.newTodoDescription.set('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  }

  protected async updateTodo(todo: Todo): Promise<void> {
    const title = this.editTitle().trim();
    const description = this.editDescription().trim();
    
    if (!title) return;

    try {
      await this.todoService.updateTodo(todo.id!, {
        title,
        description: description || undefined
      });
      
      this.cancelEdit();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  }

  protected async deleteTodo(id: string): Promise<void> {
    try {
      await this.todoService.deleteTodo(id);
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  }

  protected async toggleTodo(id: string): Promise<void> {
    try {
      await this.todoService.toggleTodo(id);
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  }

  protected startEdit(todo: Todo): void {
    this.editingTodo.set(todo);
    this.editTitle.set(todo.title);
    this.editDescription.set(todo.description || '');
  }

  protected cancelEdit(): void {
    this.editingTodo.set(null);
    this.editTitle.set('');
    this.editDescription.set('');
  }
}
