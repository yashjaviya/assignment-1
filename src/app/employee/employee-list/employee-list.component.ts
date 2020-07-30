import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/model/shared.model';
import { SharedService } from '../../shared/service/shared.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employee: Employee[] = [];
  no = 1;

  constructor(private sharedService: SharedService,) {
    this.sharedService.getEmployeeList().subscribe(result => {
      this.employee = result;
    });
  }

  ngOnInit(): void {
  }

  delete(id) {
    this.sharedService.deleteEmployee(id).subscribe(result => {
      this.employee = result;
    });
  }
}
