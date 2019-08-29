import { Component, OnInit, Output, EventEmitter, SimpleChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/categories.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

 

  @Output()
  resChangedOut = new EventEmitter(); 
  orderForm: FormGroup;
  items: FormArray;
  @Input()
  categeoriesALL=[]


  constructor(private formBuilder: FormBuilder, private catservice: CategoriesService) { }

  ngOnInit() {

    // this.catservice.getAllCategories().subscribe(
    //   data => {
    //     this.categeoriesALL = data
    //     console.table(this.categeoriesALL)
    //    }
    // )

    this.orderForm = this.formBuilder.group({
      name: '',
      price: NaN,
      items: this.formBuilder.array([this.createItem()])
    });


  }

  createItem(): FormGroup {
    return this.formBuilder.group({

      numberofkillos: NaN

    });
  }



  addItem(): void {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createItem());
   // console.log(this.items)

  }

  ngDoCheck(changes: SimpleChanges) {
    this.resChangedOut.emit(this.orderForm.value);
  }


}
