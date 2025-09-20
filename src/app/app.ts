import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoComponent],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected readonly title = signal('firebase-demo');
}
