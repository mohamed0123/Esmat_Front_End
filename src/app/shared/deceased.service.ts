import { Injectable } from '@angular/core';

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EnrollmentService } from 'src/app/services/enrollment.service';
import * as _ from 'lodash';

export interface Deceased {
  id: number
  typeOfPiecesConsumed: string
  price: number
}


export interface DeceasedDatesObj {
  startDate: Date
  endDate: Date
 }


@Injectable({
  providedIn: 'root'
})
export class DeceasedService {


  constructor(private enroll: EnrollmentService  ) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    typeOfPiecesConsumed: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      typeOfPiecesConsumed: '',
      price:0
    });
  }

  
  insertNewDeceased() {

     return this.enroll.createDeceased( this.form.value)
     }

     getAllDeceased() {

      return this.enroll.getAllDeceased()
     }

     getAllDeceasedByDate(startDate , endDate) {

      return this.enroll.getAllDeceasedBydate(startDate , endDate)
     }

     populateForm(row) {
 
      this.form.setValue({
        id: row.id,
        typeOfPiecesConsumed: row.typeOfPiecesConsumed,
        price: row.price,
      })
   
    }
   
}
