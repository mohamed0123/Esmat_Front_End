import { Injectable } from '@angular/core';
import { HUMAN_RESOURCES } from './human-resources.service';
import { CATEGORY } from './categories.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EnrollmentService } from 'src/app/services/enrollment.service';
import * as _ from 'lodash';



export interface EmployeeTimeTracker {
  id: number
  humanResources: HUMAN_RESOURCES
  timeInHour: number
}


export interface EmployeeTimeTrackerObj {
  hr: HUMAN_RESOURCES
  startDate: Date
  endDate: Date
}


@Injectable({
  providedIn: 'root'
})
export class EmployeeTimeTrackerService {


  constructor(private enroll: EnrollmentService) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    humanResources: new FormControl(null, Validators.required),
    timeInHour: new FormControl(0, Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      humanResources: null,
      timeInHour: 0,

    });
  }


  filterExactHr(hrList, val) {
    return hrList.filter((hr) => {
      return hr.name == val
    })
  }

  insertNewEmployeeTimeTracker(hrList) {

    this.form.controls['humanResources'].enable()
    this.form.controls['humanResources'].setValue(this.filterExactHr(hrList, this.form.value['humanResources'])[0]);

    console.table(this.form.value)
    return this.enroll.createEmployeeTimeTracker(this.form.value)
  }

  getAllEmployeeTimeTracker() {
    return this.enroll.getAllEmployeeTimeTracker()
  }

  getAllEmployeeTimeTrackerByHr(hr) {
    return this.enroll.getAllEmployeeTimeTrackerByHr(hr)
  }

  getAllEmployeeTimeTrackerByHrAndDate(hr, startDate, endDate) {
    return this.enroll.getAllEmployeeTimeTrackerByHrAndDate(hr, startDate, endDate)
  }

  populateForm(row) {
    this.form.controls['humanResources'].disable()
    this.form.setValue({
      id: row.id,
      humanResources: row.humanResources.name,
      timeInHour: row.timeInHour,
    })

  }
}
