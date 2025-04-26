import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [];
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  private nextId = 1;

  constructor() {
  
  }

  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find(emp => emp.id === id);
  }

  addEmployee(employee: Employee): void {
    this.employees.push(employee);
    this.employeesSubject.next([...this.employees]);
  }

  updateEmployee(employee: Employee): void {
    const index = this.employees.findIndex(emp => emp.id === employee.id);
    if (index !== -1) {
      this.employees[index] = employee;
      this.employeesSubject.next([...this.employees]);
    }
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(emp => emp.id !== id);
    this.employeesSubject.next([...this.employees]);
  }

  getRandomAvatar(): string {
    const avatars = [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXpmpA6rd6htw-iutNYcVml3-hwpFfyPjDnw&s',
      'https://cdn.britannica.com/65/194465-050-50F2A305/Vladimir-Putin-questions-news-conference-2016.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8r3KoUKQNbDetUZZ39XphuRnPnoeqEVo7_A&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTqTd-8gQZg7_y2-hiLZcYsG2kOgeLDeRLsQ&s'
    ];
    return avatars[Math.floor(Math.random() * avatars.length)];
  }
} 