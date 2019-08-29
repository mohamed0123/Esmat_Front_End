import { Injectable } from '@angular/core';

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EnrollmentService } from 'src/app/services/enrollment.service';
import * as _ from 'lodash';

export interface OtherExpenses {
  id: number
  typeOfPiecesConsumed: string
  price: number
}


export interface OtherExpensesDatesObj {
  startDate: Date
  endDate: Date
 }

@Injectable({
  providedIn: 'root'
})
export class OtherExpensesService {



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

  
  insertNewOtherExpenses() {

     return this.enroll.createOtherExpenses( this.form.value)
     }

     getAllOtherExpenses() {

      return this.enroll.getAllOtherExpenses()
     }

     getAllOtherExpensesByDate(startDate , endDate) {

      return this.enroll.getAllOtherExpensesBydate(startDate , endDate)
     }

     populateForm(row) {
 
      this.form.setValue({
        id: row.id,
        typeOfPiecesConsumed: row.typeOfPiecesConsumed,
        price: row.price,
      })
   
    }
}
