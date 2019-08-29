import { Injectable } from '@angular/core';

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EnrollmentService } from 'src/app/services/enrollment.service';
import * as _ from 'lodash';
import { HUMAN_RESOURCES } from './human-resources.service';
import { CATEGORY } from './categories.service';

export interface ManufacturersOfproductfitting {
  id: number
  quantityInKillo: number
  priceInKillo: number
  humanResources: HUMAN_RESOURCES
  category: CATEGORY
  advanceAccounts: number
}



export interface MF_O_P_F {
  hr: HUMAN_RESOURCES
  startDate: Date
  endDate: Date
 }

@Injectable({
  providedIn: 'root'
})
export class ManufacturersOfproductfittingsService {
   constructor(private enroll: EnrollmentService) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    quantityInKillo: new FormControl(0, Validators.required),
    priceInKillo: new FormControl(0, Validators.required),
    humanResources: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    advanceAccounts: new FormControl(0, Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      quantityInKillo: 0,
      priceInKillo: 0,
      humanResources: null,
      category: null,
      advanceAccounts: 0,

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

  insertNewManufacturersOfProductFittings(hrList, catList) {


    this.form.controls['category'].setValue(this.filterExactCat(catList, this.form.value['category'])[0]);

    this.form.controls['humanResources'].enable()
    this.form.controls['humanResources'].setValue(this.filterExactHr(hrList, this.form.value['humanResources'])[0]);
 
    console.table(this.form.value)
    return this.enroll.createManufacturersOfProductFittings(this.form.value)
  }

  getAllManufacturersOfProductFittings() {

    return this.enroll.getAllManufacturersOfProductFittings()
  }

  getAllManufacturersOfProductFittingsByHr(hr) {

    return this.enroll.getAllManufacturersOfProductFittingsByHr(hr)
  }

  getAllManufacturersOfProductFittingsByHrAndDate(hr , startDate, endDate) {

    return this.enroll.getAllManufacturersOfProductFittingsByHrAndDate(hr , startDate , endDate)
  }

  populateForm(row) {
    this.form.controls['humanResources'].disable()
     this.form.setValue({
      id: row.id,
      quantityInKillo: row.quantityInKillo,
      priceInKillo: row.priceInKillo,
      humanResources: row.humanResources.name,
      category: row.category.category,
      advanceAccounts: row.advanceAccounts,
    })

  }
}
