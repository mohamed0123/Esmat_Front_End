import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MF_O_P_F } from '../shared/manufacturers-ofproductfittings.service';
import { PurchasesObj } from '../shared/purchases.service';
import { SalesObj } from '../shared/sales.service';
import { DeceasedDatesObj } from '../shared/deceased.service';
import { EmployeeAncestorObj } from '../shared/employee-ancestor.service';
import { EmployeeTimeTrackerObj } from '../shared/employee-time-tracker.service';
import { OtherExpensesDatesObj } from '../shared/other-expenses.service';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  humanResourcesUrl: string = 'http://localhost:8080/humanresources/';
  categoriesUrl: string = 'http://localhost:8080/categories/';
  deceasedUrl: string = 'http://localhost:8080/deceased/';
  manufacturersOfProductFittingsUrl: string = 'http://localhost:8080/manufacturersOfproductfittings/';
  purchases: string = 'http://localhost:8080/purchases/';
  sales: string = 'http://localhost:8080/sales/';
  empWorkHourSalaryURL: string = 'http://localhost:8080/employeeworkhourandsalary/';
  MFOPF :MF_O_P_F;
  PurchasesObj :PurchasesObj;
  SalesObj :SalesObj;

  summaryObj;
  summary :string =  'http://localhost:8080/summary/';

  DeceasedDatesObj:DeceasedDatesObj;
  OtherExpensesDatesObj:OtherExpensesDatesObj;
  
  OtherExpensesUrl: string = 'http://localhost:8080/otherexpenses/';

  employeeAncestor: string = 'http://localhost:8080/employeeancestor/';
  employeeAncestorObj   :EmployeeAncestorObj;




  employeeTimeTracker: string = 'http://localhost:8080/employeetimetracker/';
  employeeTimeTrackerObj   :EmployeeTimeTrackerObj;


  constructor(private http: HttpClient) { }


  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  createHumanResource(term): Observable<any> {
    console.log(term)
    console.log(`${this.humanResourcesUrl}create`)
    return this.http.post<any>(`${this.humanResourcesUrl}create`, term).pipe(catchError(this.errorHandler));
  }


  getHumanResources(): Observable<any> {
    console.log(`${this.humanResourcesUrl}all`)
    return this.http.get<any>(`${this.humanResourcesUrl}all`).pipe(catchError(this.errorHandler));
  }

  

  getHumanResourcesTyped(val): Observable<any> {
    console.log(`${this.humanResourcesUrl}all/${val}`)
    return this.http.get<any>(`${this.humanResourcesUrl}all/${val}`).pipe(catchError(this.errorHandler));
  }
  deleteHumanResource(id): Observable<any> {
    console.log(`${this.humanResourcesUrl}delete/${id}`)
    return this.http.delete(`${this.humanResourcesUrl}delete/${id}`).pipe(catchError(this.errorHandler));
  }






  createCategory(term): Observable<any> {
    console.log(term)
    console.log(`${this.categoriesUrl}create`)
    return this.http.post<any>(`${this.categoriesUrl}create`, term).pipe(catchError(this.errorHandler));
  }


  getAllCategories(): Observable<any> {
    console.log(`${this.categoriesUrl}all`)
    return this.http.get<any>(`${this.categoriesUrl}all`).pipe(catchError(this.errorHandler));
  }

  deleteHumanCategory(id): Observable<any> {
    console.log(`${this.categoriesUrl}delete/${id}`)
    return this.http.delete(`${this.categoriesUrl}delete/${id}`).pipe(catchError(this.errorHandler));
  }







  createDeceased(term): Observable<any> {
    console.log(term)
    console.log(`${this.deceasedUrl}create`)
    return this.http.post<any>(`${this.deceasedUrl}create`, term).pipe(catchError(this.errorHandler));
  }


  getAllDeceased(): Observable<any> {
    console.log(`${this.deceasedUrl}all`)
    return this.http.get<any>(`${this.deceasedUrl}all`).pipe(catchError(this.errorHandler));
  }

  getAllDeceasedBydate(startDateP , endDateP): Observable<any> {
    console.log(`${this.deceasedUrl}byDate`)
    this.DeceasedDatesObj = { startDate:startDateP , endDate:endDateP }
    return this.http.post<any>(`${this.deceasedUrl}byDate` ,   this.DeceasedDatesObj ).pipe(catchError(this.errorHandler));
  }
  
  deleteDeceased(id): Observable<any> {
    console.log(`${this.deceasedUrl}delete/${id}`)
    return this.http.delete(`${this.deceasedUrl}delete/${id}`).pipe(catchError(this.errorHandler));
  }



  createManufacturersOfProductFittings(term): Observable<any> {
    console.log(term)
    console.log(`${this.manufacturersOfProductFittingsUrl}create`)
    return this.http.post<any>(`${this.manufacturersOfProductFittingsUrl}create`, term).pipe(catchError(this.errorHandler));
  }

  getAllManufacturersOfProductFittingsByHr(hr): Observable<any> {
    console.log(`${this.manufacturersOfProductFittingsUrl}ByHR`)
    return this.http.post<any>(`${this.manufacturersOfProductFittingsUrl}ByHR` , hr).pipe(catchError(this.errorHandler));
  }

  getAllManufacturersOfProductFittingsByHrAndDate(hrP, startDateP , endDateP): Observable<any> {
    console.log(`${this.manufacturersOfProductFittingsUrl}ByHRAndDate`)
    this.MFOPF  = {hr :hrP ,startDate:startDateP , endDate:endDateP }
    return this.http.post<any>(`${this.manufacturersOfProductFittingsUrl}ByHRAndDate` ,this.MFOPF ).pipe(catchError(this.errorHandler));
  }
  getAllManufacturersOfProductFittings(): Observable<any> {
    console.log(`${this.manufacturersOfProductFittingsUrl}all`)
    return this.http.get<any>(`${this.manufacturersOfProductFittingsUrl}all`).pipe(catchError(this.errorHandler));
  }

  deleteManufacturersOfProductFittings(id): Observable<any> {
    console.log(`${this.manufacturersOfProductFittingsUrl}delete/${id}`)
    return this.http.delete(`${this.manufacturersOfProductFittingsUrl}delete/${id}`).pipe(catchError(this.errorHandler));

  }










  createPurchases(term): Observable<any> {
    console.log(term)
    console.log(`${this.purchases}create`)
    return this.http.post<any>(`${this.purchases}create`, term).pipe(catchError(this.errorHandler));
  }

  getAllPurchasesByHr(hr): Observable<any> {
    console.log(`${this.purchases}ByHR`)
    return this.http.post<any>(`${this.purchases}ByHR` , hr).pipe(catchError(this.errorHandler));
  }

  getAllPurchasesByHrAndDate(hrP, startDateP , endDateP): Observable<any> {
    console.log(`${this.purchases}ByHRAndDate`)
    this.PurchasesObj  = {hr :hrP ,startDate:startDateP , endDate:endDateP }
    return this.http.post<any>(`${this.purchases}ByHRAndDate` ,this.PurchasesObj ).pipe(catchError(this.errorHandler));
  }

  

  getAllPurchases(): Observable<any> {
    console.log(`${this.purchases}all`)
    return this.http.get<any>(`${this.purchases}all`).pipe(catchError(this.errorHandler));
  }

  deletePurchases(id): Observable<any> {
    console.log(`${this.purchases}delete/${id}`)
    return this.http.delete(`${this.purchases}delete/${id}`).pipe(catchError(this.errorHandler));

  }








  
  createSales(term): Observable<any> {
    console.log(term)
    console.log(`${this.sales}create`)
    return this.http.post<any>(`${this.sales}create`, term).pipe(catchError(this.errorHandler));
  }

  getAllSalesByHr(hr): Observable<any> {
    console.log(`${this.sales}ByHR`)
    return this.http.post<any>(`${this.sales}ByHR` , hr).pipe(catchError(this.errorHandler));
  }


  getPreviousTotalPriceForHr(hr): Observable<any> {
    console.log(`${this.sales}previoustotalpriceforhr`)
    return this.http.post<any>(`${this.sales}previoustotalpriceforhr` , hr).pipe(catchError(this.errorHandler));
  }

  

  getAllSalesByHrAndDate(hrP, startDateP , endDateP): Observable<any> {
    console.log(`${this.sales}ByHRAndDate`)
    this.SalesObj  = {hr :hrP ,startDate:startDateP , endDate:endDateP }
    return this.http.post<any>(`${this.sales}ByHRAndDate` ,this.SalesObj ).pipe(catchError(this.errorHandler));
  }
  getAllSales(): Observable<any> {
    console.log(`${this.sales}all`)
    return this.http.get<any>(`${this.sales}all`).pipe(catchError(this.errorHandler));
  }

  deleteSales(id): Observable<any> {
    console.log(`${this.sales}delete/${id}`)
    return this.http.delete(`${this.sales}delete/${id}`).pipe(catchError(this.errorHandler));

  }










  


  
  createempWorkHourSalary(term): Observable<any> {
    console.log(term)
    console.log(`${this.empWorkHourSalaryURL}create`)
    return this.http.post<any>(`${this.empWorkHourSalaryURL}create`, term).pipe(catchError(this.errorHandler));
  }

  getAllempWorkHourSalaryByHr(hr): Observable<any> {
    console.log(`${this.empWorkHourSalaryURL}ByHR`)
    return this.http.post<any>(`${this.empWorkHourSalaryURL}ByHR` , hr).pipe(catchError(this.errorHandler));
  }

 
  getAllempWorkHourSalary(): Observable<any> {
    console.log(`${this.empWorkHourSalaryURL}all`)
    return this.http.get<any>(`${this.empWorkHourSalaryURL}all`).pipe(catchError(this.errorHandler));
  }

  deleteempWorkHourSalary(id): Observable<any> {
    console.log(`${this.empWorkHourSalaryURL}delete/${id}`)
    return this.http.delete(`${this.empWorkHourSalaryURL}delete/${id}`).pipe(catchError(this.errorHandler));

  }










  createEmployeeAncestor(term): Observable<any> {
     console.log(`${this.employeeAncestor}create`)
     return this.http.post<any>(`${this.employeeAncestor}create`, term).pipe(catchError(this.errorHandler));
  }

  getAllEmployeeAncestorByHr(hr): Observable<any> {
    console.log(`${this.employeeAncestor}ByHR`)
    return this.http.post<any>(`${this.employeeAncestor}ByHR` , hr).pipe(catchError(this.errorHandler));
  }

  getAllEmployeeAncestorByHrAndDate(employeeWorkHourAndSalaryP, startDateP , endDateP): Observable<any> {
    console.log(`${this.employeeAncestor}getAllByEmployeeAncestorDate`)
    this.employeeAncestorObj  = {employeeWorkHourAndSalary :employeeWorkHourAndSalaryP ,startDate:startDateP , endDate:endDateP }
    return this.http.post<any>(`${this.employeeAncestor}getAllByEmployeeAncestorDate` ,this.employeeAncestorObj ).pipe(catchError(this.errorHandler));
  }
  getAllEmployeeAncestor(): Observable<any> {
    console.log(`${this.employeeAncestor}all`)
    return this.http.get<any>(`${this.employeeAncestor}all`).pipe(catchError(this.errorHandler));
  }

  deleteEmployeeAncestor(id): Observable<any> {
    console.log(`${this.employeeAncestor}delete/${id}`)
    return this.http.delete(`${this.employeeAncestor}delete/${id}`).pipe(catchError(this.errorHandler));

  }


















  createEmployeeTimeTracker(term): Observable<any> {
    console.log(`${this.employeeTimeTracker}create`)
    return this.http.post<any>(`${this.employeeTimeTracker}create`, term).pipe(catchError(this.errorHandler));
    }
    
    getAllEmployeeTimeTrackerByHr(hr): Observable<any> {
    console.log(`${this.employeeTimeTracker}ByHR`)
    return this.http.post<any>(`${this.employeeTimeTracker}ByHR` , hr).pipe(catchError(this.errorHandler));
    }
    
    getAllEmployeeTimeTrackerByHrAndDate(hrP, startDateP , endDateP): Observable<any> {
    console.log(`${this.employeeTimeTracker}ByHRAndDate`)
    this.employeeTimeTrackerObj = {hr :hrP ,startDate:startDateP , endDate:endDateP }
    return this.http.post<any>(`${this.employeeTimeTracker}ByHRAndDate` ,this.employeeTimeTrackerObj ).pipe(catchError(this.errorHandler));
    }
    getAllEmployeeTimeTracker(): Observable<any> {
    console.log(`${this.employeeTimeTracker}all`)
    return this.http.get<any>(`${this.employeeTimeTracker}all`).pipe(catchError(this.errorHandler));
    }
    
    deleteEmployeeTimeTracker(id): Observable<any> {
    console.log(`${this.employeeTimeTracker}delete/${id}`)
    return this.http.delete(`${this.employeeTimeTracker}delete/${id}`).pipe(catchError(this.errorHandler));
    
    }
    








    

  createOtherExpenses(term): Observable<any> {
    console.log(term)
    console.log(`${this.OtherExpensesUrl}create`)
    return this.http.post<any>(`${this.OtherExpensesUrl}create`, term).pipe(catchError(this.errorHandler));
  }


  getAllOtherExpenses(): Observable<any> {
    console.log(`${this.OtherExpensesUrl}all`)
    return this.http.get<any>(`${this.OtherExpensesUrl}all`).pipe(catchError(this.errorHandler));
  }

  getAllOtherExpensesBydate(startDateP , endDateP): Observable<any> {
    console.log(`${this.OtherExpensesUrl}byDate`)
    this.OtherExpensesDatesObj = { startDate:startDateP , endDate:endDateP }
    return this.http.post<any>(`${this.OtherExpensesUrl}byDate` ,   this.OtherExpensesDatesObj ).pipe(catchError(this.errorHandler));
  }
  
  deleteOtherExpenses(id): Observable<any> {
    console.log(`${this.OtherExpensesUrl}delete/${id}`)
    return this.http.delete(`${this.OtherExpensesUrl}delete/${id}`).pipe(catchError(this.errorHandler));
  }







  getAllSummary( startDateP , endDateP): Observable<any> {
    console.log(`${this.summary}ByHRAndDate`)
    this.summaryObj  = { startDate:startDateP , endDate:endDateP }
    return this.http.post<any>(`${this.summary}ByHRAndDate` ,this.summaryObj ).pipe(catchError(this.errorHandler));
  }

}