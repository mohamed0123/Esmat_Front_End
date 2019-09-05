import { Component, OnInit, ViewChild, SimpleChanges, Input } from '@angular/core';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { CustomersCrudComponent } from '../customers-crud/customers-crud.component';
import { DialogService } from 'src/app/shared/dialog.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { HumanResourcesService, HUMAN_RESOURCES } from 'src/app/shared/human-resources.service';
import { ExcelService } from 'src/app/helper/excel.service';



@Component({
  selector: 'app-customers-crud-table-viwer',
  templateUrl: './customers-crud-table-viwer.component.html',
  styleUrls: ['./customers-crud-table-viwer.component.css']
})
export class CustomersCrudTableViwerComponent implements OnInit {
  displayedColumns: string[] = ['UPDATE', 'PAGE_NO', 'LINE_NO', 'LINES_COUNT', 'FEATURE', 'TEAM', 'GENDER', 'STATUS'];
  checker;
  dataArray: MatTableDataSource<HUMAN_RESOURCES>;
  tableData = []
  searchKey;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private service: HumanResourcesService, private enroll: EnrollmentService,
     private notificationService: NotificationService, private dialog: MatDialog,
      private dialogService: DialogService, private excelService:ExcelService) { }

  ngOnInit() {
    this.loadData();
   }



  loadData() {

    this.service.getAllHumanResources().subscribe(data => {
      if (data) {
        this.tableData = []
        this.dataArray = new MatTableDataSource<HUMAN_RESOURCES>(this.tableData);
        this.dataArray.filterPredicate = (data: any, filterValue:string) => {
          const dataStr =JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filterValue) != -1; 
        }
        this.dataArray.filter = ''
        // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
        this.dataArray.paginator = this.paginator;
        
        if (data.length > 0) {
          console.table(data)
          
          // this.dataArray = new MatTableDataSource<SUPPLIER_CONDITION>(data);
          data.forEach(element => {
            this.tableData.push(element)
          });

          this.dataArray = new MatTableDataSource<HUMAN_RESOURCES>(this.tableData);
          this.dataArray.filterPredicate = (data: any, filterValue:string) => {
            const dataStr =JSON.stringify(data).toLowerCase();
            return dataStr.indexOf(filterValue) != -1; 
          }
          this.dataArray.filter = ''
          // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
          this.dataArray.paginator = this.paginator;
          // this.dataArray.sort = this.sort;
          //   this.notificationService.success('تم التحميل')
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


  applyFilter(filterValue: string) {
    this.dataArray.filter = filterValue.trim().toLowerCase();

   

  }


  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let dialogRef =  this.dialog.open(CustomersCrudComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data=>{

      this.loadData();
    });
  }


  onEdit(row) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let dialogRef =   this.dialog.open(CustomersCrudComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data=>{

      this.loadData();
    });
  }

  onDelete($key) {
    this.dialogService.openConfirmDialog('هل انت متأكد من حذف العميل؟')
      .afterClosed().subscribe(res => {
        console.log('res')
        console.log(res)
        console.log($key)
        if (res) {
          this.enroll.deleteHumanResource($key).subscribe(() => {
            this.notificationService.success(' تم الحذف بنجاح !');
            this.loadData();
          },
            error => {
              this.notificationService.warn(error.message)

            });
        }
      });
  }

    ngOnChanges(changes: SimpleChanges) {
      console.log('gggggggggggggggg')
      this.loadData();

  }

  exportAsXLSX():void {

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


     

    this.excelService.exportAsExcelFile(data, 'Customers');
  }
}
