import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {
  employee: Employee | undefined;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employee = this.employeeService.getEmployeeById(+id);
      if (!this.employee) {
        this.router.navigate(['/']);
      }
    }
  }

  onEdit(): void {
    if (this.employee) {
      this.router.navigate(['/edit', this.employee.id]);
    }
  }

  onDelete(): void {
    if (this.employee && confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(this.employee.id);
      this.router.navigate(['/']);
    }
  }
} 