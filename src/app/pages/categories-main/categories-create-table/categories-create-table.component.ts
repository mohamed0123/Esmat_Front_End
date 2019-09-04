import { Component, OnInit, ViewChild, SimpleChanges, Input } from '@angular/core';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { DialogService } from 'src/app/shared/dialog.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { ExcelService } from 'src/app/helper/excel.service';
import { CATEGORY, CategoriesService } from 'src/app/shared/categories.service';
import { CategoriesCreateComponent } from '../categories-create/categories-create.component';

@Component({
  selector: 'app-categories-create-table',
  templateUrl: './categories-create-table.component.html',
  styleUrls: ['./categories-create-table.component.css']
})
export class CategoriesCreateTableComponent implements OnInit {
  displayedColumns: string[] = ['UPDATE', 'LST', 'CREATIONDATE', 'CATEGORY'];
  checker;
  dataArray: MatTableDataSource<CATEGORY>;
  tableData = []
  searchKey;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private service: CategoriesService, private enroll: EnrollmentService,
     private notificationService: NotificationService, private dialog: MatDialog,
      private dialogService: DialogService, private excelService:ExcelService) { }

  ngOnInit() {
    this.loadData();
   }



  loadData() {

    this.service.getAllCategories().subscribe(data => {
      if (data) {
        this.tableData = []
        this.dataArray = new MatTableDataSource<CATEGORY>(this.tableData);
        this.dataArray.filter = ''
        this.dataArray.paginator = this.paginator;
        
        if (data.length > 0) {
          console.table(data)
          
          // this.dataArray = new MatTableDataSource<SUPPLIER_CONDITION>(data);
          data.forEach(element => {
            this.tableData.push(element)
          });

          this.dataArray = new MatTableDataSource<CATEGORY>(this.tableData);
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
    let dialogRef =   this.dialog.open(CategoriesCreateComponent, dialogConfig);
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
    let dialogRef =   this.dialog.open(CategoriesCreateComponent, dialogConfig);
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
          this.enroll.deleteHumanCategory($key).subscribe(() => {
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
    this.excelService.exportAsExcelFile(this.tableData, 'sample');
  }

}
