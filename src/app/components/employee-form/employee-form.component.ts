import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = {
    id: 0,
    name: '',
    companyName: '',
    email: '',
    contactNo: '',
    designation: '',
    avatar: ''
  };
  isEditMode = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      const employee = this.employeeService.getEmployeeById(+id);
      if (employee) {
        this.employee = { ...employee };
      }
    } else {
      this.employee.avatar = this.employeeService.getRandomAvatar();
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employee);
    } else {
      this.employee.id = Date.now();
      this.employeeService.addEmployee(this.employee);
    }
    this.router.navigate(['/']);
  }
} 