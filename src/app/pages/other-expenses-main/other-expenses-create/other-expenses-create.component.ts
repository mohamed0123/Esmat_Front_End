import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material';
import { NotificationService } from 'src/app/shared/notification.service';
import { Router  }     from '@angular/router';
import { CategoriesService } from 'src/app/shared/categories.service';
import { OtherExpensesService } from 'src/app/shared/other-expenses.service';

@Component({
  selector: 'app-other-expenses-create',
  templateUrl: './other-expenses-create.component.html',
  styleUrls: ['./other-expenses-create.component.css']
})
export class OtherExpensesCreateComponent implements OnInit {



  constructor(public dialogRef: MatDialogRef<OtherExpensesCreateComponent> , public service: OtherExpensesService
    , private notificationService: NotificationService,private router: Router ) { }
   // https://github.com/CodAffection/Angular-Material-CRUD-Design/tree/master/CompleteAngularMaterialApp
 
   ngOnInit() {
   }
   onClear() {
     let element: HTMLElement =  document.querySelector('button[id="buttonReset"]') as HTMLElement;
     element.click();
      
   }
  
   onFormSubmit(){
     this.service.insertNewOtherExpenses().subscribe(
       mdata => {
          this.onClear();
           this.notificationService.success('تمت العمليه بنجاح');
           this.onClose();
           // this.router.navigateByUrl('/pageNotFound', { skipLocationChange: true });
           // this.router.navigate(["humanResources"]);
        },
       error => {
         console.log(error)
         this.notificationService.warn(error.message);
       }
 
     );
     
   
   }
 
   onClose() {
     this.service.form.reset();
     this.service.initializeFormGroup();
     this.dialogRef.close();
   }

}
