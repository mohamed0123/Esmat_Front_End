import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material';
import { NotificationService } from 'src/app/shared/notification.service';
import { Router  }     from '@angular/router';
import { CategoriesService } from 'src/app/shared/categories.service';
import { DeceasedService } from 'src/app/shared/deceased.service';

@Component({
  selector: 'app-deceased-create',
  templateUrl: './deceased-create.component.html',
  styleUrls: ['./deceased-create.component.css']
})
export class DeceasedCreateComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DeceasedCreateComponent> , public service: DeceasedService
    , private notificationService: NotificationService,private router: Router ) { }
   // https://github.com/CodAffection/Angular-Material-CRUD-Design/tree/master/CompleteAngularMaterialApp
 
   ngOnInit() {
   }
   onClear() {
     let element: HTMLElement =  document.querySelector('button[id="buttonReset"]') as HTMLElement;
     element.click();
      
   }
  
   onFormSubmit(){
     this.service.insertNewDeceased().subscribe(
       mdata => {
          this.onClear();
           this.notificationService.success('تمت العمليه بنجاح');
 
           // this.router.navigateByUrl('/pageNotFound', { skipLocationChange: true });
           // this.router.navigate(["humanResources"]);
        },
       error => {
         console.log(error)
         this.notificationService.warn(error.message);
       }
 
     );
     
     this.onClose();
   }
 
   onClose() {
     this.service.form.reset();
     this.service.initializeFormGroup();
     this.dialogRef.close();
   }


}
