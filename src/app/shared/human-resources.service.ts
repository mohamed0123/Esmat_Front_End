import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EnrollmentService } from 'src/app/services/enrollment.service';
import * as _ from 'lodash';

export interface HUMAN_RESOURCES {
  id: number
  name: string
  email: string
  phoneNumber: string
  city: string
  gender: string
  humanResourceType: string
  firstContact: string
  isPermanent: string

}

@Injectable({
  providedIn: 'root'
})
export class HumanResourcesService {
 
  constructor(private enroll: EnrollmentService  ) { }


  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('ذكر'),
    humanResourceType: new FormControl('',Validators.required),
    firstContact: new FormControl('',Validators.required),
    isPermanent: new FormControl(false)
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      name: '',
      email: '',
      phoneNumber: '',
      city: '',
      gender: 'ذكر',
      humanResourceType: 0,
      firstContact: new Date(),
      isPermanent: false
    });
  }


  
  insertNewHumanResource() {
 
   let res = this.form.value

    if (res['isPermanent'] == false){
      res['isPermanent'] = 0
    }else{
      res['isPermanent'] = 1
    }
    return this.enroll.createHumanResource( res)
    }

  
  getAllHumanResources() {

   return this.enroll.getHumanResources()
  }


  getAllHumanResourcesTyped(val) {

    return this.enroll.getHumanResourcesTyped(val)
   }

  populateForm(row) {
 
    this.form.setValue({
      id: row.id,
      name: row.name,
      email: row.email,
      phoneNumber: row.phoneNumber,
      city: row.city,
      gender: row.gender,
      humanResourceType: row.humanResourceType,
      firstContact: row.firstContact,
      isPermanent: row.isPermanent
    })
 
  }
}
