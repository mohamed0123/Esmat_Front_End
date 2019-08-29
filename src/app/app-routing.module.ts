import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { HumanResourcesMainComponent } from './pages/human-resources-main/human-resources-main.component';
import { CategoriesMainComponent } from './pages/categories-main/categories-main.component';
import { DeceasedMainComponent } from './pages/deceased-main/deceased-main.component';
import { ManufacturersOfproductfittingsCreateTableComponent } from './pages/manufacturersOfproductfittings-main/manufacturers-ofproductfittings-create-table/manufacturers-ofproductfittings-create-table.component';
import { PurchasesMainComponent } from './pages/purchases-main/purchases-main.component';
import { SalesMainComponent } from './pages/sales-main/sales-main.component';
import { EmployeeWorkHourAndSalaryMainComponent } from './pages/employee-work-hour-and-salary-main/employee-work-hour-and-salary-main.component';
import { EmployeeAncestorMainComponent } from './pages/employee-ancestor-main/employee-ancestor-main.component';
import { EmployeeTimeTrackerMainComponent } from './pages/employee-time-tracker-main/employee-time-tracker-main.component';
import { OtherExpensesMainComponent } from './pages/other-expenses-main/other-expenses-main.component';
import { ItemRepeaterComponent } from './pages/bill/item-repeater/item-repeater.component';
import { SummaryComponent } from './pages/summary/summary.component';
 
const routes: Routes = [
{ path: '', redirectTo: 'sales', pathMatch: 'full' },
{ path: 'login', redirectTo: 'sales', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'humanResources', component: HumanResourcesMainComponent },
{ path: 'categories', component: CategoriesMainComponent },
{ path: 'mfrpfctc', component: ManufacturersOfproductfittingsCreateTableComponent },
{ path: 'empworkhoursandsalary', component: EmployeeWorkHourAndSalaryMainComponent },
{ path: 'employeeancestor', component: EmployeeAncestorMainComponent },
{ path: 'employeetimetracker', component: EmployeeTimeTrackerMainComponent },
{ path: 'summary', component: SummaryComponent },

{ path: 'bill', component: ItemRepeaterComponent },

{ path: 'deceased', component: DeceasedMainComponent },
{ path: 'otherexpenses', component: OtherExpensesMainComponent },
{ path: 'purchases', component: PurchasesMainComponent },
{ path: 'sales', component: SalesMainComponent },
{ path: 'pageNotFound', component: PageNotFoundComponent },
{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [  LoginComponent,   PageNotFoundComponent ]
