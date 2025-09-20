import { Injectable, signal } from '@angular/core';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../../firebase.config';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos = signal<Todo[]>([]);
  public readonly todos$ = this.todos.asReadonly();

  constructor() {
    this.subscribeToTodos();
  }

  private subscribeToTodos() {
    const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
    
    onSnapshot(q, (snapshot) => {
      const todos: Todo[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        todos.push({
          id: doc.id,
          title: data['title'],
          description: data['description'],
          completed: data['completed'],
          createdAt: data['createdAt']?.toDate() || new Date(),
          updatedAt: data['updatedAt']?.toDate() || new Date()
        });
      });
      this.todos.set(todos);
    });
  }

  async addTodo(todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    try {
      const now = new Date();
      await addDoc(collection(db, 'todos'), {
        ...todo,
        createdAt: Timestamp.fromDate(now),
        updatedAt: Timestamp.fromDate(now)
      });
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  }

  async updateTodo(id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<void> {
    try {
      const todoRef = doc(db, 'todos', id);
      await updateDoc(todoRef, {
        ...updates,
        updatedAt: Timestamp.fromDate(new Date())
      });
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }

  async deleteTodo(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }

  async toggleTodo(id: string): Promise<void> {
    const todo = this.todos().find(t => t.id === id);
    if (todo) {
      await this.updateTodo(id, { completed: !todo.completed });
    }
  }
}
