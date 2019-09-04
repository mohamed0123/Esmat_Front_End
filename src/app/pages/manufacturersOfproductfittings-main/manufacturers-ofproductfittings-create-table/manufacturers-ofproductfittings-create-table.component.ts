import { Component, OnInit, ViewChild, SimpleChanges, Input } from '@angular/core';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { DialogService } from 'src/app/shared/dialog.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { ExcelService } from 'src/app/helper/excel.service';
import { ManufacturersOfproductfittingsService, ManufacturersOfproductfitting } from 'src/app/shared/manufacturers-ofproductfittings.service';
import { ManufacturersOfproductfittingsCreateComponent } from '../manufacturers-ofproductfittings-create/manufacturers-ofproductfittings-create.component';
import { HumanResourcesService } from 'src/app/shared/human-resources.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manufacturers-ofproductfittings-create-table',
  templateUrl: './manufacturers-ofproductfittings-create-table.component.html',
  styleUrls: ['./manufacturers-ofproductfittings-create-table.component.css']
})
export class ManufacturersOfproductfittingsCreateTableComponent implements OnInit {
  // https://www.npmjs.com/package/ng-pick-datetime
  displayedColumns: string[] = ['UPDATE', 'LST', 'CREATIONDATE', 'totalPrice'
    , 'priceAllKillios', 'priceInKillo', 'quantityInKillo', 'humanResources'
    , 'category', 'advanceAccounts'
  ];
  checker;
  dataArray: MatTableDataSource<ManufacturersOfproductfitting>;
  tableData = []
  humanResourcesAllType = [];
  humanResourcesInnerList;
  searcedItem;
  hrRow;
  start_date = new Date();
  end_date = new Date();
  totalSum = 0;
  searchKey;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private service: ManufacturersOfproductfittingsService, private datePipe: DatePipe, private enroll: EnrollmentService,
    private notificationService: NotificationService, private dialog: MatDialog, private hrservice: HumanResourcesService,
    private dialogService: DialogService, private excelService: ExcelService) { }

  ngOnInit() {
    this.hrservice.getAllHumanResourcesTyped('المصنع').subscribe(
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
    this.dataArray = new MatTableDataSource<ManufacturersOfproductfitting>(this.tableData);
    this.dataArray.filter = ''
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.dataArray.paginator = this.paginator;
    console.log('my array')
    console.log(temp)
    if (temp.length > 0)
      this.totalSum = temp.reduce((a, b) => { return a + b.totalPrice } , 0)
    console.log(this.totalSum)
  }

  loadData(hr) {
    this.tableData = []
    this.dataArray = new MatTableDataSource<ManufacturersOfproductfitting>(this.tableData);
    this.dataArray.filter = ''
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.dataArray.paginator = this.paginator;
    this.loadMatTableDataSource();
    this.service.getAllManufacturersOfProductFittingsByHr(hr).subscribe(data => {
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


  loadDataWithDate(hr , startDate , endDate ) {
    this.tableData = []
    this.dataArray = new MatTableDataSource<ManufacturersOfproductfitting>(this.tableData);
    this.dataArray.filter = ''
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.dataArray.paginator = this.paginator;
    this.loadMatTableDataSource();
    this.service.getAllManufacturersOfProductFittingsByHrAndDate(hr , startDate, endDate).subscribe(data => {
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

  onSearchClear() {
    this.applyFilter("");
  }

  applyFactoryNameFilter(filterValue: string) {
    this.dataArray.filter = filterValue.trim().toLowerCase();
 

  }

  applyFilter(filterValue: string) {
    this.dataArray.filter = filterValue.trim().toLowerCase();

   

  }


  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    
    let dialogRef =   this.dialog.open(ManufacturersOfproductfittingsCreateComponent, dialogConfig);
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
    let dialogRef =   this.dialog.open(ManufacturersOfproductfittingsCreateComponent, dialogConfig);

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
          this.enroll.deleteManufacturersOfProductFittings($key).subscribe(() => {
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
   this.excelService.exportAsExcelFile(this.tableData, 'Product fitting');

  //   var tableToExcel = (function () {
  //     var uri = 'data:application/vnd.ms-excel;base64,',
  //         template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
  //         , base64 = function (s) {
  //             return window.btoa(unescape(encodeURIComponent(s)))
  //         }
  //         , format = function (s, c) {
  //             return s.replace(/{(\w+)}/g, function (m, p) {
  //                 return c[p];
  //             })
  //         };
  //     return function (table, name) {
  //         if (!table.nodeType) table = document.getElementById(table);
  //         var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
  //         window.location.href = uri + base64(format(template, ctx));
  //     }
  // })();
  
  // // usage
  // tableToExcel('#table','Export Name');
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
    console.log(this.searcedItem)
    this.hrRow = this.filterExactHr(this.humanResourcesAllType, item)[0]
    // this.loadData(this.filterExactHr(this.humanResourcesAllType, item)[0])
    this.  loadDataWithCurrentDates();
  }

  _filterByDates() {
    // console.log( 'this.start_date ' ,  this.datePipe.transform(this.start_date , 'yyyy-MM-dd') )

    // let temp = this.tableData.filter(
    //   m => new Date(m.dayDate) >=  new Date(this.datePipe.transform(this.start_date , 'yyyy-MM-dd')) && new Date(m.dayDate) <=  new Date(this.datePipe.transform(this.end_date , 'yyyy-MM-dd'))
    // )
    // this.dataArray = new MatTableDataSource<ManufacturersOfproductfitting>(temp);
    // this.dataArray.filter = ''
    // // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    // this.dataArray.paginator = this.paginator;
    // console.log('my array')
    // console.log(temp)
    // if (temp.length > 0)
    //   this.totalSum = temp.reduce((a, b) => { return a + b.totalPrice } , 0)
    // console.log(this.totalSum)

    this.  loadDataWithCurrentDates();
    //this.loadDataWithDate(this.hrRow ,  new Date(this.datePipe.transform(this.start_date , 'yyyy-MM-dd')) ,  new Date(this.datePipe.transform(this.end_date , 'yyyy-MM-dd')) );
  }

  loadDataWithCurrentDates(){
    this.loadDataWithDate(this.hrRow ,  new Date(this.datePipe.transform(this.start_date , 'yyyy-MM-dd')) ,  new Date(this.datePipe.transform(this.end_date , 'yyyy-MM-dd')) );

  }

  setEndDate(event): void {
    this.end_date = event;
  }

  setStartDate(event): void {
    this.start_date = event;
  }

  loadRefreshData(){
    // this.loadData(this.hrRow)
    this.loadDataWithCurrentDates();
   }

}
