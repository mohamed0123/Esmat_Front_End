import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  searchKey;
  dataArray: MatTableDataSource<any>;
  tableData = []
  totalSum;
  displayedColumns: string[] = ['daysCounted', 'sumPrice', 'name'
  ];

  start_date = new Date();
  end_date = new Date();
  Summary;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private datePipe: DatePipe, private service: EnrollmentService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.Summary = { name: '', sumPrice: 0, daysCounted: 0 }
    this.loadData();
  }
  applyFilter(filterValue: string) {
    this.dataArray.filter = filterValue.trim().toLowerCase();
  }
  onSearchClear() {
    this.applyFilter("");
    }
  loadData() {
    this.tableData = []
    this.dataArray = new MatTableDataSource<any>(this.tableData);
    this.dataArray.filter = ''
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.dataArray.paginator = this.paginator;
    this.loadMatTableDataSource();
    this.service.getAllSummary(new Date(this.datePipe.transform(this.start_date, 'yyyy-MM-dd')), new Date(this.datePipe.transform(this.end_date, 'yyyy-MM-dd'))).subscribe(data => {
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
  setEndDate(event): void {
    this.end_date = event;
  }

  setStartDate(event): void {
    this.start_date = event;
  }


  loadMatTableDataSource() {
    let temp = this.tableData.slice()
    this.dataArray = new MatTableDataSource<any>(this.tableData);
    this.dataArray.filter = ''
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.dataArray.paginator = this.paginator;
    console.log('my array')
    console.log(temp)
    if (temp.length > 0)
      this.totalSum = temp.reduce((a, b) => { return a + b.sumPrice }, 0)
    console.log(this.totalSum)
  }


}
