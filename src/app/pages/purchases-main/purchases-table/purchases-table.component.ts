import { Component, OnInit, ViewChild, SimpleChanges, Input } from '@angular/core';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { DialogService } from 'src/app/shared/dialog.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { ExcelService } from 'src/app/helper/excel.service';
import { PurchasesService, Purchases } from 'src/app/shared/purchases.service';
import { HumanResourcesService } from 'src/app/shared/human-resources.service';
import { DatePipe } from '@angular/common';
import { PurchasesCreateComponent } from '../purchases-create/purchases-create.component';

@Component({
  selector: 'app-purchases-table',
  templateUrl: './purchases-table.component.html',
  styleUrls: ['./purchases-table.component.css']
})
export class PurchasesTableComponent implements OnInit {
  searchKey;
  // https://www.npmjs.com/package/ng-pick-datetime
  displayedColumns: string[] = ['UPDATE', 'LST', 'CREATIONDATE', 'totalPrice'
    , 'priceAllKillios', 'priceInKillo', 'quantityInKillo', 'humanResources'
    , 'category', 'payments'
  ];
  checker;
  dataArray: MatTableDataSource<Purchases>;
  tableData = []
  humanResourcesAllType = [];
  humanResourcesInnerList;
  searcedItem;
  hrRow;
  start_date = new Date();
  end_date = new Date();
  totalSum = 0;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private service: PurchasesService, private datePipe: DatePipe, private enroll: EnrollmentService,
    private notificationService: NotificationService, private dialog: MatDialog, private hrservice: HumanResourcesService,
    private dialogService: DialogService, private excelService: ExcelService) { }

  ngOnInit() {
    this.hrservice.getAllHumanResourcesTyped('الموردين').subscribe(
      data => {
        this.humanResourcesAllType = data
        console.table(this.humanResourcesAllType)
        this.searcedItem = data[0].name
        this.hrRow = data[0]
        // this.loadData(this.hrRow);
        this.loadDataWithCurrentDates();
      }
    )

  }

  loadMatTableDataSource() {
    let temp = this.tableData.slice()
    this.dataArray = new MatTableDataSource<Purchases>(this.tableData);
    this.dataArray.filter = ''
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.dataArray.paginator = this.paginator;
    console.log('my array')
    console.log(temp)
    if (temp.length > 0)
      this.totalSum = temp.reduce((a, b) => { return a + b.totalPrice }, 0)
    console.log(this.totalSum)
  }

  loadData(hr) {
    this.tableData = []
    this.dataArray = new MatTableDataSource<Purchases>(this.tableData);
    this.dataArray.filter = ''
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.dataArray.paginator = this.paginator;

    this.loadMatTableDataSource();
    this.service.getAllPurchasesByHr(hr).subscribe(data => {
      if (data) {

        if (data.length > 0) {
          console.table(data)
          data.forEach(element => {
            this.tableData.push(element)
          });
          this.loadMatTableDataSource();
        }

      }

    },
      error => {
        //  this.successMsg = NaN
        //  this.errorMsg = error.message
        this.notificationService.warn(error.message)
      });
  }


  loadDataWithDate(hr, startDate, endDate) {
    console.log(hr)
     
    this.tableData = []
    this.dataArray = new MatTableDataSource<Purchases>(this.tableData);
    this.dataArray.filter = ''
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.dataArray.paginator = this.paginator;

    this.loadMatTableDataSource();
    this.service.getAllPurchasesByHrAndDate(hr, startDate, endDate).subscribe(data => {
      if (data) {

        if (data.length > 0) {
          console.table(data)
          data.forEach(element => {
            this.tableData.push(element)
          });
          this.loadMatTableDataSource();
        }

      }

    },
      error => {
        //  this.successMsg = NaN
        //  this.errorMsg = error.message
        console.table(error)
        this.notificationService.warn(error.message)
      });
  }

  onSearchClear() {
    this.applyFilter("");
  }

  applyFactoryNameFilter(filterValue: string) {
    this.dataArray.filter = filterValue.trim().toLowerCase();

 

  }

  applyFilter(filterValue: string) {
    this.dataArray.filter = filterValue.trim().toLowerCase();
 
    // this.loadMatTableDataSource() ;
  }


  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let dialogRef =    this.dialog.open(PurchasesCreateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data=>{

      this.loadDataWithCurrentDates();
    });
  }


  onEdit(row) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let dialogRef =   this.dialog.open(PurchasesCreateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data=>{

      this.loadDataWithCurrentDates();
    });
  }

  onDelete($key) {
    this.dialogService.openConfirmDialog('هل انت متأكد من حذف العميل؟')
      .afterClosed().subscribe(res => {
        console.log('res')
        console.log(res)
        console.log($key)
        if (res) {
          this.enroll.deletePurchases($key).subscribe(() => {
            this.notificationService.success(' تم الحذف بنجاح !');
            // this.loadData(this.hrRow);
            this.loadDataWithCurrentDates();
          },
            error => {
              this.notificationService.warn(error.message)

            });
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('gggggggggggggggg', this.hrRow)
    // this.loadData(this.hrRow);
    this.loadDataWithCurrentDates();

  }

  exportAsXLSX(): void {
    let data = []

    
    document.querySelectorAll('mat-header-row').forEach(
      r => {
        let row = []
        r.querySelectorAll('mat-header-cell').forEach(e => {
          let cell = <HTMLElement> e
          row.push(cell.innerText)
        })

        data.push(row.slice(1))
      }
    )

    document.querySelectorAll('mat-row').forEach(
      r => {
        let row = []
        r.querySelectorAll('mat-cell').forEach(e => {
          let cell = <HTMLElement> e
          row.push(cell.innerText)
        })

        data.push(row.slice(1))
      }
    )


     

    this.excelService.exportAsExcelFile(data, 'Purchases');
 
  }


  doFilter(fetVal) {
   
    console.log(fetVal)
    this.humanResourcesInnerList = this.humanResourcesAllType.filter((humanResource) => {
      return humanResource.name.includes(fetVal)
    })
  }

  filterExactHr(hrList, val) {
    return hrList.filter((hr) => {
      return hr.name == val
    })
  }
  _setSearcedItem(item) {
    this.searcedItem = item
    this.hrRow = this.filterExactHr(this.humanResourcesAllType, item)[0]
    console.log(this.searcedItem)
    // this.loadData(this.filterExactHr(this.humanResourcesAllType, item)[0])
    this.loadDataWithCurrentDates();
  }

  _filterByDates() {
    // console.log( 'this.start_date ' ,  this.datePipe.transform(this.start_date , 'yyyy-MM-dd') )

    // let temp = this.tableData.filter(
    //   m => new Date(m.dayDate) >=  new Date(this.datePipe.transform(this.start_date , 'yyyy-MM-dd')) && new Date(m.dayDate) <=  new Date(this.datePipe.transform(this.end_date , 'yyyy-MM-dd'))
    // )
    // this.dataArray = new MatTableDataSource<Purchases>(temp);
    // this.dataArray.filter = ''
    // // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    // this.dataArray.paginator = this.paginator;
    // console.log('my array')
    // console.log(temp)
    // if (temp.length > 0)
    //   this.totalSum = temp.reduce((a, b) => { return a + b.totalPrice } , 0)
    // console.log(this.totalSum)

    this.loadDataWithCurrentDates();
    //this.loadDataWithDate(this.hrRow ,  new Date(this.datePipe.transform(this.start_date , 'yyyy-MM-dd')) ,  new Date(this.datePipe.transform(this.end_date , 'yyyy-MM-dd')) );
  }

  loadDataWithCurrentDates() {
    this.loadDataWithDate(this.hrRow, new Date(this.datePipe.transform(this.start_date, 'yyyy-MM-dd')), new Date(this.datePipe.transform(this.end_date, 'yyyy-MM-dd')));

  }

  setEndDate(event): void {
    this.end_date = event;
  }

  setStartDate(event): void {
    this.start_date = event;
  }

  loadRefreshData() {
    // this.loadData(this.hrRow)
    this.loadDataWithCurrentDates();
  }

}
