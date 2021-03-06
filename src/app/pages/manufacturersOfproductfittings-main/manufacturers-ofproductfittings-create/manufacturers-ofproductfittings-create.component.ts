import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { HumanResourcesService } from 'src/app/shared/human-resources.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManufacturersOfproductfittingsService } from 'src/app/shared/manufacturers-ofproductfittings.service';
import { CategoriesService } from 'src/app/shared/categories.service';
@Component({
  selector: 'app-manufacturers-ofproductfittings-create',
  templateUrl: './manufacturers-ofproductfittings-create.component.html',
  styleUrls: ['./manufacturers-ofproductfittings-create.component.css']
})
export class ManufacturersOfproductfittingsCreateComponent implements OnInit {

  humanResourcesAll = [];
  categeoriesALL = [];
  categeories;
  humanResourcesInnerList;
  constructor(public dialogRef: MatDialogRef<ManufacturersOfproductfittingsCreateComponent>, public service: ManufacturersOfproductfittingsService, private catservice: CategoriesService
    , private notificationService: NotificationService, private router: Router, private hrservice: HumanResourcesService) { }
  // https://github.com/CodAffection/Angular-Material-CRUD-Design/tree/master/CompleteAngularMaterialApp

  ngOnInit() {
    this.hrservice.getAllHumanResourcesTyped('المصنع').subscribe(
      data => {
        this.humanResourcesAll = data
        console.table(this.humanResourcesAll)
      }
    )

    this.catservice.getAllCategories().subscribe(
      data => {
        this.categeoriesALL = data
        console.table(this.categeoriesALL)
      }
    )



  }
  onClear() {
    let element: HTMLElement = document.querySelector('button[id="buttonReset"]') as HTMLElement;
    element.click();

  }

  onFormSubmit() {
    this.service.insertNewManufacturersOfProductFittings(this.humanResourcesAll, this.categeoriesALL).subscribe(
      mdata => {
        this.onClear();
        if (mdata != null)
          this.notificationService.success('تمت العمليه بنجاح');
        else
          this.notificationService.warn(' لا يمكنك التعديل الا على اخر عمليه للصنايعى');
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

  doFilterCat(fetVal) {
    console.log(fetVal)
    this.categeories = this.categeoriesALL.filter((cat) => {
      return cat.category.includes(fetVal)
    })
    // this.humanResources = this.hrservice.getSeFeaturesNames(fetVal.toLowerCase())
    //   .pipe(
    //   map(featuresL => this.filter(featuresL)),
    // )
  }





}
