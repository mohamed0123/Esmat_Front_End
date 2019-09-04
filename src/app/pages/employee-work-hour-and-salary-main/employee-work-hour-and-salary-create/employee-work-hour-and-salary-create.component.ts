import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { HumanResourcesService } from 'src/app/shared/human-resources.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/categories.service';
import { EmployeeWorkHourAndSalaryTableService } from 'src/app/shared/employee-work-hour-and-salary-table.service';
 
@Component({
  selector: 'app-employee-work-hour-and-salary-create',
  templateUrl: './employee-work-hour-and-salary-create.component.html',
  styleUrls: ['./employee-work-hour-and-salary-create.component.css']
})
export class EmployeeWorkHourAndSalaryCreateComponent implements OnInit {


  humanResourcesAll = [];
 
  humanResourcesInnerList;
  constructor(public dialogRef: MatDialogRef<EmployeeWorkHourAndSalaryCreateComponent>, public service: EmployeeWorkHourAndSalaryTableService,  
      private notificationService: NotificationService, private router: Router, private hrservice: HumanResourcesService) { }
  // https://github.com/CodAffection/Angular-Material-CRUD-Design/tree/master/CompleteAngularMaterialApp

  ngOnInit() {
    this.hrservice.getAllHumanResourcesTyped('موظف').subscribe(
      data => {
        this.humanResourcesAll = data
        console.table(this.humanResourcesAll)
      }
    )

 



  }
  onClear() {
    // let element: HTMLElement = document.querySelector('button[id*="buttonReset"]') as HTMLElement;
    // element.click();

  }

  onFormSubmit() {
    this.service.insertNewempWorkHourSalary(this.humanResourcesAll ).subscribe(
      mdata => {
        this.onClear();
        if (mdata != null)
          this.notificationService.success('تمت العمليه بنجاح');
        else
          this.notificationService.warn(' لا يمكنك التعديل الا على اخر عمليه ');
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
    this.service.form.controls['humanResources'].enable()
  }



  doFilter(fetVal) {
    console.log(fetVal)
    // this.jokes = this.service.getData()
    //   .pipe(
    //   map(jokes => this.filter(jokes.value)),
    // )
    this.humanResourcesInnerList = this.humanResourcesAll.filter((humanResource) => {
      return humanResource.name.includes(fetVal)
    })
    // this.humanResources = this.hrservice.getSeFeaturesNames(fetVal.toLowerCase())
    //   .pipe(
    //   map(featuresL => this.filter(featuresL)),
    // )
  }

  // filter(values) {
  //   return values.filter(feature => true)
  // }

 

}
