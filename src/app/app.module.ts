import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule , routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatMenuModule} from '@angular/material/menu';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatSortModule  } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule , MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { CustomersCrudComponent } from './pages/human-resources-main/customers-crud/customers-crud.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CustomersCrudTableViwerComponent } from './pages/human-resources-main/customers-crud-table-viwer/customers-crud-table-viwer.component';
import { HumanResourcesMainComponent } from './pages/human-resources-main/human-resources-main.component';
import { MatConfirmDialogComponent } from './pages/helper/mat-confirm-dialog/mat-confirm-dialog.component';
import { MaterialModule } from './material/material/material.module';
import { ExcelService } from './helper/excel.service';
import { CategoriesMainComponent } from './pages/categories-main/categories-main.component';
import { CategoriesCreateComponent } from './pages/categories-main/categories-create/categories-create.component';
import { CategoriesCreateTableComponent } from './pages/categories-main/categories-create-table/categories-create-table.component';
import { DeceasedMainComponent } from './pages/deceased-main/deceased-main.component';
import { DeceasedCreateComponent } from './pages/deceased-main/deceased-create/deceased-create.component';
import { DeceasedCreateTableComponent } from './pages/deceased-main/deceased-create-table/deceased-create-table.component';
import { ManufacturersOfproductfittingsCreateTableComponent } from './pages/manufacturersOfproductfittings-main/manufacturers-ofproductfittings-create-table/manufacturers-ofproductfittings-create-table.component';
import { ManufacturersOfproductfittingsCreateComponent } from './pages/manufacturersOfproductfittings-main/manufacturers-ofproductfittings-create/manufacturers-ofproductfittings-create.component';
import { DatePipe } from '@angular/common';
import { PurchasesMainComponent } from './pages/purchases-main/purchases-main.component';
import { PurchasesCreateComponent } from './pages/purchases-main/purchases-create/purchases-create.component';
import { PurchasesTableComponent } from './pages/purchases-main/purchases-table/purchases-table.component';
import { SalesMainComponent } from './pages/sales-main/sales-main.component';
import { SalesTableComponent } from './pages/sales-main/sales-table/sales-table.component';
import { SalesCreateComponent } from './pages/sales-main/sales-create/sales-create.component';
import { EmployeeWorkHourAndSalaryMainComponent } from './pages/employee-work-hour-and-salary-main/employee-work-hour-and-salary-main.component';
import { EmployeeWorkHourAndSalaryCreateComponent } from './pages/employee-work-hour-and-salary-main/employee-work-hour-and-salary-create/employee-work-hour-and-salary-create.component';
import { EmployeeWorkHourAndSalaryTableComponent } from './pages/employee-work-hour-and-salary-main/employee-work-hour-and-salary-table/employee-work-hour-and-salary-table.component';
import { EmployeeAncestorMainComponent } from './pages/employee-ancestor-main/employee-ancestor-main.component';
import { EmployeeAncestorCreateComponent } from './pages/employee-ancestor-main/employee-ancestor-create/employee-ancestor-create.component';
import { EmployeeAncestorTableComponent } from './pages/employee-ancestor-main/employee-ancestor-table/employee-ancestor-table.component';
import { EmployeeTimeTrackerMainComponent } from './pages/employee-time-tracker-main/employee-time-tracker-main.component';
import { EmployeeTimeTrackerCreateComponent } from './pages/employee-time-tracker-main/employee-time-tracker-create/employee-time-tracker-create.component';
import { EmployeeTimeTrackerTableComponent } from './pages/employee-time-tracker-main/employee-time-tracker-table/employee-time-tracker-table.component';
import { OtherExpensesMainComponent } from './pages/other-expenses-main/other-expenses-main.component';
import { OtherExpensesCreateComponent } from './pages/other-expenses-main/other-expenses-create/other-expenses-create.component';
import { OtherExpensesTableComponent } from './pages/other-expenses-main/other-expenses-table/other-expenses-table.component';
import { BillComponent } from './pages/bill/bill.component';
import { ItemRepeaterComponent } from './pages/bill/item-repeater/item-repeater.component';
import { SummaryComponent } from './pages/summary/summary.component';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    routingComponents,
    CustomersCrudComponent,
    CustomersCrudTableViwerComponent,
    HumanResourcesMainComponent,
    MatConfirmDialogComponent,
    CategoriesMainComponent,
    CategoriesCreateComponent,
    CategoriesCreateTableComponent,
    DeceasedMainComponent,
    DeceasedCreateComponent,
    DeceasedCreateTableComponent,
    ManufacturersOfproductfittingsCreateComponent,
    ManufacturersOfproductfittingsCreateTableComponent,
    PurchasesMainComponent,
    PurchasesCreateComponent,
    PurchasesTableComponent,
    SalesMainComponent,
    SalesTableComponent,
    SalesCreateComponent,
    EmployeeWorkHourAndSalaryMainComponent,
    EmployeeWorkHourAndSalaryCreateComponent,
    EmployeeWorkHourAndSalaryTableComponent,
    EmployeeAncestorMainComponent,
    EmployeeAncestorCreateComponent,
    EmployeeAncestorTableComponent,
    EmployeeTimeTrackerMainComponent,
    EmployeeTimeTrackerCreateComponent,
    EmployeeTimeTrackerTableComponent,
    OtherExpensesMainComponent,
    OtherExpensesCreateComponent,
    OtherExpensesTableComponent,
    BillComponent,
    ItemRepeaterComponent,
    SummaryComponent,    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    HttpClientModule,
    MatSortModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatSelectModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MaterialModule,
    MatMenuModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  providers: [MatDatepickerModule,  ExcelService , DatePipe],
  bootstrap: [AppComponent],
  entryComponents:[CustomersCrudComponent , OtherExpensesCreateComponent , EmployeeTimeTrackerCreateComponent , EmployeeAncestorCreateComponent, EmployeeWorkHourAndSalaryCreateComponent , SalesCreateComponent , PurchasesCreateComponent ,ManufacturersOfproductfittingsCreateComponent , DeceasedCreateComponent, CategoriesCreateComponent, MatConfirmDialogComponent]
})
export class AppModule { }
