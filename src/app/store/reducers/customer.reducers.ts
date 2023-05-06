import { createReducer, on } from "@ngrx/store";
import { Customer } from "src/app/models/customer";
import * as fromActions from "../actions/customer.actions";



const initialState:ReadonlyArray<Customer>=[];

const _CustomerReducer = createReducer(
    initialState,
    on(fromActions.loadCustomerSuccess ,(state,{customers})=>{
        if(customers && customers.length){
            return [...state ,...customers]
        }
        return [...state]
    }),
    on(fromActions.addCustomerSuccess, (state ,{customer}) =>{ 
        return [...state ,customer]
    }),
    on(fromActions.removeCustomerSuccess,(state , {customerId})=>{
        return [...state.filter((item)=> item.id != customerId)]

    }),
    on(fromActions.updateCustomer,(state ,{customerId ,updatedCustomerdata})=>{
        const selectedItemToUpdate= state.findIndex((item)=>item.id ==customerId);
        const newCopy=[...state];
        newCopy[selectedItemToUpdate]=updatedCustomerdata;
        return newCopy;
    })
);

export function CustomerReducer(state: any, action:any) {
    return _CustomerReducer(state, action);
}