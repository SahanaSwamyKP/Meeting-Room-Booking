import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../../app.service';
import { FooterComponent } from '../../../footer/footer.component';
import { HeaderComponent } from '../../../header/header.component';
import { EmpTab } from '../../../../models/emp-tab';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule,FooterComponent,HeaderComponent],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent implements OnInit {
 
  employee:EmpTab={
    empId: 0,
    empName: '',
    empRole: '',
    empEmail: '',
    empPassword: '',
    available: false,
    slotTabs: []
  };
  empId:number=0;
  employees!: any;
 
  constructor(private route:ActivatedRoute,private router:Router,private service:AppService)
  {}
 
  async ngOnInit(): Promise<void> {
    //this.employee=this.employeeService.setEmployeeData(this.employee);
 
    (await this.service.GetAllEmp()).subscribe((emp: EmpTab[])=>{
      this.employees=emp;
    });
    const idParam = this.route.snapshot.paramMap.get('empID');
    if(idParam!==null)
    {
      const id = parseInt(idParam, 10);
      if (id > 0) {
        (await this.service.GetEmpID(id)).subscribe((element: EmpTab)=>{
          this.employee=element
        })
      }else {
        console.error("Invalid ID parameter:", idParam);
    }
    }
  }

  async onSave() {
    (await this.service.UpdateEmployee(this.employee)).subscribe((res: any)=>{
      alert(res);
    });
  }
}
//}
 