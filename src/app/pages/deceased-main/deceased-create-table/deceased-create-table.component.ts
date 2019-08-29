import { Component, OnInit, ViewChild, SimpleChanges, Input } from '@angular/core';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { DialogService } from 'src/app/shared/dialog.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { ExcelService } from 'src/app/helper/excel.service';
import { Deceased, DeceasedService } from 'src/app/shared/deceased.service';
import { DeceasedCreateComponent } from '../deceased-create/deceased-create.component';

@Component({
  selector: 'app-deceased-create-table',
  templateUrl: './deceased-create-table.component.html',
  styleUrls: ['./deceased-create-table.component.css']
})
export class DeceasedCreateTableComponent implements OnInit {

  displayedColumns: string[] = ['UPDATE', 'LST', 'CREATIONDATE' , 'PRICE' , 'TYPE_OF_PIECES_CONSUMED'];
  checker;
  dataArray: MatTableDataSource<Deceased>;
  tableData = []
  start_date = new Date();
  end_date = new Date();
  searchKey;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private service: DeceasedService, private enroll: EnrollmentService,
     private notificationService: NotificationService, private dialog: MatDialog,
      private dialogService: DialogService, private excelService:ExcelService) { }

  ngOnInit() {
    this.loadData();
   }


setEndDate(event): void {
    this.end_date = event;
  }

  setStartDate(event): void {
    this.start_date = event;
  }
  
  loadData() {

    this.service.getAllDeceasedByDate(this.start_date , this.end_date).subscribe(data => {
      if (data) {
        this.tableData = []
        this.dataArray = new MatTableDataSource<Deceased>(this.tableData);
        this.dataArray.filter = ''
        this.dataArray.paginator = this.paginator;

        if (data.length > 0) {
          console.table(data)
          
          // this.dataArray = new MatTableDataSource<SUPPLIER_CONDITION>(data);
          data.forEach(element => {
            this.tableData.push(element)
          });

          this.dataArray = new MatTableDataSource<Deceased>(this.tableData);
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

    // if (this.dataArray.paginator) {
    //   this.dataArray.paginator.firstPage();
    // }

  }


  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(DeceasedCreateComponent, dialogConfig);
  }


  onEdit(row) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(DeceasedCreateComponent, dialogConfig);
  }

  onDelete($key) {
    this.dialogService.openConfirmDialog('هل انت متأكد من حذف العميل؟')
      .afterClosed().subscribe(res => {
        console.log('res')
        console.log(res)
        console.log($key)
        if (res) {
          this.enroll.deleteDeceased($key).subscribe(() => {
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
