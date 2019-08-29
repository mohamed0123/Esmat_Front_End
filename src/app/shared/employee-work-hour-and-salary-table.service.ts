import { Injectable } from '@angular/core';
import { HUMAN_RESOURCES } from './human-resources.service';
import { CATEGORY } from './categories.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EnrollmentService } from 'src/app/services/enrollment.service';
import * as _ from 'lodash';



export interface empWorkHourSalary {
  id: number
   humanResources: HUMAN_RESOURCES
   salary: number
 }

 
@Injectable({
  providedIn: 'root'
})
export class EmployeeWorkHourAndSalaryTableService {


  constructor(private enroll: EnrollmentService) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
     humanResources: new FormControl(null, Validators.required),
     salary: new FormControl(0, Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
       humanResources: null,
       salary: 0,

    });
  }

  filterExactCat(catList, val) {
    return catList.filter((cat) => {
      return cat.category == val
    })
  }
  filterExactHr(hrList, val) {
    return hrList.filter((hr) => {
      return hr.name == val
    })
  }

  insertNewempWorkHourSalary(hrList ) {


 
    this.form.controls['humanResources'].enable()
    this.form.controls['humanResources'].setValue(this.filterExactHr(hrList, this.form.value['humanResources'])[0]);
 
    console.table(this.form.value)
    return this.enroll.createempWorkHourSalary(this.form.value)
  }

  getAllempWorkHourSalary() {

    return this.enroll.getAllempWorkHourSalary()
  }

  getAllempWorkHourSalaryByHr(hr) {

    return this.enroll.getAllempWorkHourSalaryByHr(hr)
  }
 

  populateForm(row) {
    this.form.controls['humanResources'].disable()
     this.form.setValue({
      id: row.id,
       humanResources: row.humanResources.name,
       salary: row.salary,
    })

  }
}
