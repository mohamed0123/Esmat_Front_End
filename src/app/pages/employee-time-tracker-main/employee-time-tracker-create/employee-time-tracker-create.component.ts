import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { HumanResourcesService } from 'src/app/shared/human-resources.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/categories.service';
import { Sales, SalesService } from 'src/app/shared/Sales.service';
import { EmployeeTimeTrackerService } from 'src/app/shared/employee-time-tracker.service';

@Component({
  selector: 'app-employee-time-tracker-create',
  templateUrl: './employee-time-tracker-create.component.html',
  styleUrls: ['./employee-time-tracker-create.component.css']
})
export class EmployeeTimeTrackerCreateComponent implements OnInit {

 
  
  humanResourcesAll = [];
  humanResourcesInnerList;
  constructor(public dialogRef: MatDialogRef<EmployeeTimeTrackerCreateComponent>, public service: EmployeeTimeTrackerService
    , private notificationService: NotificationService, private router: Router, private hrservice: HumanResourcesService) { }
  // https://github.com/CodAffection/Angular-Material-CRUD-Design/tree/master/CompleteAngularMaterialApp

  ngOnInit() {
    this.hrservice.getAllHumanResources().subscribe(
      data => {
        this.humanResourcesAll = data
        console.table(this.humanResourcesAll)
      }
    )
 
  }
  onClear() {
    let element: HTMLElement = document.querySelector('button[id*="buttonReset"]') as HTMLElement;
    element.click();

  }

  onFormSubmit() {
    this.service.insertNewEmployeeTimeTracker(this.humanResourcesAll ).subscribe(
      mdata => {
        this.onClear();
        if (mdata != null)
          this.notificationService.success('تمت العمليه بنجاح');
        else
          this.notificationService.warn(' لا يمكنك التعديل الا على اخر عمليه للمورد');

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
    this.service.form.controls['humanResources'].enable()
  }



  doFilter(fetVal) {
    console.log(fetVal)
    this.humanResourcesInnerList = this.humanResourcesAll.filter((humanResource) => {
      return humanResource.name.includes(fetVal)
    })
  }

   
}
