import { Component, OnInit, Output , EventEmitter, ViewChild } from '@angular/core';

import { MatDialogRef } from '@angular/material';
import { HumanResourcesService } from 'src/app/shared/human-resources.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { Router  }     from '@angular/router';
@Component({
  selector: 'app-customers-crud',
  templateUrl: './customers-crud.component.html',
  styleUrls: ['./customers-crud.component.css']
})
export class CustomersCrudComponent implements OnInit {

   constructor(public dialogRef: MatDialogRef<CustomersCrudComponent> , public service: HumanResourcesService
   , private notificationService: NotificationService,private router: Router ) { }
  // https://github.com/CodAffection/Angular-Material-CRUD-Design/tree/master/CompleteAngularMaterialApp
  humanResourceTypes = [
    { id: 1, value: 'العميل' },
    { id: 2, value: 'موظف' },
    { id: 3, value: 'المصنع' },
    { id: 3, value: 'الموردين' }
  ];
  errorMsg = null;
  successMsg = null;

 

  ngOnInit() {
  }
  onClear() {
    let element: HTMLElement =  document.querySelector('button[id="buttonReset"]') as HTMLElement;
    element.click();
     
  }
 
  onFormSubmit(){
    this.service.insertNewHumanResource().subscribe(
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
