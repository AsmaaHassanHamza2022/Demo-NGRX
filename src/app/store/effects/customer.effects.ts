import { Injectable } from '@angular/core';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from '../actions/customer.actions';
import { CustomerService } from 'src/app/Services/customer.service';
import {
  Observable,
  catchError,
  from,
  map,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CustomerEffects {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private _snackBar: MatSnackBar
  ) {}

  loadCustomers$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadCustomer),
      mergeMap(() =>
        this.customerService.getAllCustomers().pipe(
          map((customers) => {
            return {
              type: fromActions.Types.loadCustomer_Success,
              customers: customers,
            };
          }),
          catchError((err) =>
            of({ type: fromActions.Types.loadCustomer_Error, error: err })
          )
        )
      )
    )
  );

  addNewCustomer$= createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.addCustomer),
      map((action) => action.customer),
      mergeMap((customer) =>
        this.customerService.AddNewCustomer(customer).pipe(
          map((_successResult) =>
          {
            this.showToastMessage('Customer Added Successfully');
            return{type:fromActions.Types.addCustomer_Success ,customer:customer}
        }),
          catchError((err) =>of({ type: fromActions.Types.addCustomer_Error, error:err }))

          
        )
      )
    )
  );

  updateCustomer$=createEffect(()=>
  this.actions$.pipe(
    ofType(fromActions.updateCustomer),
    mergeMap((action)=>this.customerService.UpdateCustomerData(action.customerId,action.updatedCustomerdata).pipe(
        map((successMessage)=>{
            this.showToastMessage('Customer Updated Successfully')
            return ({type:fromActions.Types.updateCustomer_Success ,customerId:action.customerId ,updatedCustomerdata:action.updatedCustomerdata})
        }),
        catchError((error)=>of({type:fromActions.Types.updateCustomer_Error ,error:error}))
    ))
  ))


  deleteCustomer$=createEffect(()=>
  this.actions$.pipe(
    ofType(fromActions.removeCustomer),
       map((action)=>action.customerId),
       mergeMap((customerId)=>this.customerService.DeleteCustomer(customerId).pipe(
        map(()=>{
            this.showToastMessage('Customer Deleted Successfully')
            return ({type:fromActions.Types.removeCustomer_Success ,customerId:customerId})
        }),
        catchError((error)=>of({type:fromActions.Types.removeCustomer_Error ,error:error}))
       ))
  )
  
  )

  public showToastMessage(message:string){
    this._snackBar.open(message,'', {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration:2000,
        panelClass:['toast-message-style']
      });

  }
}
