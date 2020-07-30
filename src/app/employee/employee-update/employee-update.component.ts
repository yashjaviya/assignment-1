import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../shared/service/shared.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  employeeForm: FormGroup;
  firstname: string;
  lastname: string;
  email: any;
  mobileno: number;
  id: number;

  constructor(private route: ActivatedRoute, private sharedService: SharedService, private router: Router) {

  }

  ngOnInit(): void {
    this.fetch_details();

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

  fetch_details() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.sharedService.filterEmployee(this.id).subscribe(result => {
        this.firstname = result['firstName'];
        this.lastname = result['lastName'];
        this.email = result['email'];
        this.mobileno = result['mobileNo'];
      });
    });
  }

  update() {
    let map = { id: this.id, firstName: this.firstname, lastName: this.lastname, email: this.email, mobileNo: this.mobileno };
    this.sharedService.updateEmployee(map).subscribe(result => {
      this.router.navigate(['employee-list']);
    });
  }
}
