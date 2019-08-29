import { Injectable } from '@angular/core';
import { HUMAN_RESOURCES } from './human-resources.service';
import { CATEGORY } from './categories.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EnrollmentService } from 'src/app/services/enrollment.service';
import * as _ from 'lodash';

export interface Purchases {
  id: number
  quantityInKillo: number
  priceInKillo: number
  humanResources: HUMAN_RESOURCES
  category: CATEGORY
  payments: number
 }


export interface PurchasesObj {
  hr: HUMAN_RESOURCES
  startDate: Date
  endDate: Date
 }


@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  constructor(private enroll: EnrollmentService) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    quantityInKillo: new FormControl(0, Validators.required),
    priceInKillo: new FormControl(0, Validators.required),
    humanResources: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    payments: new FormControl(0, Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      quantityInKillo: 0,
      priceInKillo: 0,
      humanResources: null,
      category: null,
      payments: 0,

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

  insertNewPurchases(hrList, catList) {


    this.form.controls['category'].setValue(this.filterExactCat(catList, this.form.value['category'])[0]);

    this.form.controls['humanResources'].enable()
    this.form.controls['humanResources'].setValue(this.filterExactHr(hrList, this.form.value['humanResources'])[0]);
 
    console.table(this.form.value)
    return this.enroll.createPurchases(this.form.value)
  }

  getAllPurchases() {

    return this.enroll.getAllPurchases()
  }

  getAllPurchasesByHr(hr) {

    return this.enroll.getAllPurchasesByHr(hr)
  }

  getAllPurchasesByHrAndDate(hr , startDate, endDate) {

    return this.enroll.getAllPurchasesByHrAndDate(hr , startDate , endDate)
  }

  populateForm(row) {
    this.form.controls['humanResources'].disable()
     this.form.setValue({
      id: row.id,
      quantityInKillo: row.quantityInKillo,
      priceInKillo: row.priceInKillo,
      humanResources: row.humanResources.name,
      category: row.category.category,
      payments: row.payments,
    })

  }
}
