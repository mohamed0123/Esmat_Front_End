import { Injectable } from '@angular/core';
import { HUMAN_RESOURCES } from './human-resources.service';
import { CATEGORY } from './categories.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EnrollmentService } from 'src/app/services/enrollment.service';
import * as _ from 'lodash';



export interface Sales {
  id: number
  quantityInKillo: number
  priceInKillo: number
  humanResources: HUMAN_RESOURCES
  category: CATEGORY
  incomingMoney: number
 }


export interface SalesObj {
  hr: HUMAN_RESOURCES
  startDate: Date
  endDate: Date
 }
@Injectable({
  providedIn: 'root'
})
export class SalesService {


  constructor(private enroll: EnrollmentService) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    quantityInKillo: new FormControl(0, Validators.required),
    priceInKillo: new FormControl(0, Validators.required),
    humanResources: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    incomingMoney: new FormControl(0, Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      quantityInKillo: 0,
      priceInKillo: 0,
      humanResources: null,
      category: null,
      incomingMoney: 0,

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

  insertNewSales(hrList, catList) {


    this.form.controls['category'].setValue(this.filterExactCat(catList, this.form.value['category'])[0]);

    this.form.controls['humanResources'].enable()
    this.form.controls['humanResources'].setValue(this.filterExactHr(hrList, this.form.value['humanResources'])[0]);
 
    console.table(this.form.value)
    return this.enroll.createSales(this.form.value)
  }

  getAllSales() {

    return this.enroll.getAllSales()
  }

  getAllSalesByHr(hr) {

    return this.enroll.getAllSalesByHr(hr)
  }

  getAllSalesByHrAndDate(hr , startDate, endDate) {

    return this.enroll.getAllSalesByHrAndDate(hr , startDate , endDate)
  }

  populateForm(row) {
    this.form.controls['humanResources'].disable()
     this.form.setValue({
      id: row.id,
      quantityInKillo: row.quantityInKillo,
      priceInKillo: row.priceInKillo,
      humanResources: row.humanResources.name,
      category: row.category.category,
      incomingMoney: row.incomingMoney,
    })

  }
    
  insertNewSalesWithOutForm(   value) { 
    return this.enroll.createSales(value)
  }
}
