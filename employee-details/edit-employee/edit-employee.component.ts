import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../employee.service';
import { EmpTab } from '../../../models/emp-tab';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule,FooterComponent,HeaderComponent],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent implements OnInit {
 
  employee:any={};
  empId:number=0;
 
  // employee:EmpTab=  
  // {
  //   empId: 0,
  //   empName:'',
  //   empEmail: '',
  //   empRole: '',
  //   available: false,
  //   empPassword: '',
  //   slotTabs: []
  // };
  constructor(private route:ActivatedRoute,private router:Router,private employeeService:EmployeeService)
  {}
 
  ngOnInit(): void {
    //this.employee=this.employeeService.setEmployeeData(this.employee);
 
    this.employee=this.employeeService.getEmployeeData();
    const idParam = this.route.snapshot.paramMap.get('empId');
    if(idParam!==null)
    {
      const id = parseInt(idParam, 10);
      // this.employeeService.getEmployeeById(id).subscribe((data: EmpTab) => {
      //   this.employee = data;
      // });
 
      if (id > 0) {
        this.employeeService.getEmployeeById(id).subscribe({
            next: (data: EmpTab) => {
                this.employee = data;
                // Optionally, you can add additional logic here
            },
            error: (error) => {
                console.error("Failed to fetch employee data:", error);
                // Optionally, handle the error, e.g., navigate to a different page or show an error message
                this.router.navigate(['/employee-details']); // Redirect to employee list page if needed
            },
            complete: () => {
                console.log("Employee data retrieval complete");
            }
        });
    } else {
        console.error("Invalid ID parameter:", idParam);
        this.router.navigate(['/employee-details']); // Redirect to employee list page
    }
    }
    }
    onSave() {
      this.employeeService.updateEmployee(this.employee.empId,this.employee).subscribe(()=>{
        this.router.navigate(['/employee-details']);
      });
    }
}
//}
 