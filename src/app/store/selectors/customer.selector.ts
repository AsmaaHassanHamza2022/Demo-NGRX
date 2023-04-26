import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Customer } from "src/app/models/customer";


const customerSelector=(state:AppState)=>state.customers;

export const getCustomerByIndex=(customerId:any)=>
 createSelector(customerSelector,(customers:Customer[])=>{
    return customers.find((customer)=>customer.id == customerId)
})

// export const COUNT_STATE_NAME = "customers";

// export const getcount = createFeatureSelector<AppState>(COUNT_STATE_NAME);

// export const getCustomerByIndex = createSelector(customerSelector,(customers:Customer[],customerId:string)=>
//  customers.find((customer)=>customer.id == customerId)
// );

 