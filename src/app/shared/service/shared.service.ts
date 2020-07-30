import { Injectable } from '@angular/core';
import { employeeResult } from '../model/shared.response'
import { Observable, of } from 'rxjs';
import { Employee } from '../model/shared.model';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() {
  }

  getEmployeeList(): Observable<Employee[]> {
    return of(employeeResult).pipe();
  }

  filterEmployee(id): Observable<Employee[]> {
    let find = employeeResult.filter(x => x.id == id)[0];
    return of(find).pipe();
  }

  updateEmployee(data): Observable<Employee[]> {
    for (let i = 0; i < employeeResult.length; i++) {
      if (employeeResult[i].id == data['id']) {
        employeeResult[i] = data;
      }
    }
    return of(employeeResult).pipe();
  }

  deleteEmployee(id): Observable<Employee[]> {
    let index = employeeResult.findIndex(d => d.id === id);
    employeeResult.splice(index, 1);
    return of(employeeResult).pipe();
  }

  addEmployee(data): Observable<Employee[]> {
    let last_id = employeeResult.length - 1;
    let merge = { id: employeeResult[last_id]['id'] + 1, firstName: data['firstName'], lastName: data['lastName'], email: data['email'], mobileNo: data['mobileNo'] };
    employeeResult.push(merge)
    return of(employeeResult).pipe();
  }
}
