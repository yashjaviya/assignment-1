import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../shared/service/shared.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  employeeForm: FormGroup;
  firstname: string;
  lastname: string;
  email: any;
  mobileno: number;

  constructor(private route: ActivatedRoute, private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      'firstname': new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z]*'),
      ]),
      'lastname': new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z]*'),
      ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'mobileno': new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9]{10}")
      ])
    });
  }

  add() {
    let map = { firstName: this.firstname, lastName: this.lastname, email: this.email, mobileNo: this.mobileno };
    this.sharedService.addEmployee(map).subscribe(result => {
      this.router.navigate(['employee-list']);
    });
  }

}
