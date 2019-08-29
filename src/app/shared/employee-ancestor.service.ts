import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EnrollmentService } from 'src/app/services/enrollment.service';
import * as _ from 'lodash';
import { empWorkHourSalary } from './employee-work-hour-and-salary-table.service';


export interface EmployeeAncestor {
  id: number
  employeeWorkHourSalary: empWorkHourSalary
  ancestor: number
  isStillNotPaid: string
}


export interface EmployeeAncestorObj {
  employeeWorkHourAndSalary: empWorkHourSalary
  startDate: Date
  endDate: Date
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeAncestorService {


  constructor(private enroll: EnrollmentService) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    employeeWorkHourSalary: new FormControl(null, Validators.required),
    ancestor: new FormControl(0, Validators.required),
    isStillNotPaid: new FormControl(false)
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      employeeWorkHourSalary: null,
      ancestor: 0,
      isStillNotPaid: false
    });
  }


  filterExact(empWorkHourSalaryAll, val) {
    return empWorkHourSalaryAll.filter((hr) => {
      return hr.humanResources.name == val
    })
  }

  insertNewِِAnsector(empWorkHourSalaryAll) {



    this.form.controls['employeeWorkHourSalary'].enable()
    this.form.controls['employeeWorkHourSalary'].setValue(this.filterExact(empWorkHourSalaryAll, this.form.value['employeeWorkHourSalary'])[0]);

    let res = this.form.value
console.log('res[isStillNotPaid]')
console.log(res['isStillNotPaid'])
    if (res['isStillNotPaid'] == false){
      res['isStillNotPaid'] = 'لا'
    }else{
      res['isStillNotPaid'] = 'نعم'
    }

 
    console.table(res)
    return this.enroll.createEmployeeAncestor(res)
  }

  getAllEmployeeAncestor() {

    return this.enroll.getAllEmployeeAncestor();
  }

  getAllEmployeeAncestorByHr(hr) {

    return this.enroll.getAllEmployeeAncestorByHr(hr)
  }

  getAllEmployeeAncestorByHrAndDate(hr, startDate, endDate) {

    return this.enroll.getAllEmployeeAncestorByHrAndDate(hr, startDate, endDate)
  }

  populateForm(row) {
    this.form.controls['employeeWorkHourSalary'].disable()

    let isStillNotPaidP   ;

    if (row.isStillNotPaid == 'لا'){
      isStillNotPaidP = false
    }else{
      isStillNotPaidP = true
    }

    this.form.setValue({
      id: row.id,
      employeeWorkHourSalary: row.employeeWorkHourSalary.humanResources.name,
      ancestor: row.ancestor,
      isStillNotPaid: isStillNotPaidP
    })

  }
}
