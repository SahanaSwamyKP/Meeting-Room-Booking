import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {
  employees = [
    { id: 1, name: 'John Doe', role: 'Developer', email: 'john.doe@example.com', available: true },
    { id: 2, name: 'Jane Smith', role: 'Designer', email: 'jane.smith@example.com', available: false },
    // Add more employees as needed
  ];

  editEmployee(employee: any) {
    // Logic to edit employee
    console.log('Editing employee:', employee);
  }

  addEmployee() {
    // Logic to add a new employee
    console.log('Adding new employee');
  }
}