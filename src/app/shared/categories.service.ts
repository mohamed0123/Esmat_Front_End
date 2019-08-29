import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EnrollmentService } from 'src/app/services/enrollment.service';
import * as _ from 'lodash';


export interface CATEGORY {
  id: number
  category: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private enroll: EnrollmentService  ) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    category: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      category: ''
    });
  }

  
  insertNewCategory() {

     return this.enroll.createCategory( this.form.value)
     }

     getAllCategories() {

      return this.enroll.getAllCategories()
     }


     populateForm(row) {
 
      this.form.setValue({
        id: row.id,
        category: row.category,
      })
   
    }
   
}
