import { createReducer, on } from "@ngrx/store";
import { Customer } from "src/app/models/customer";
import { addCustomer, removeCustomer, updateCustomer } from "../actions/customer.actions";



const initialState:ReadonlyArray<Customer>=[];

const _CustomerReducer = createReducer(
    initialState,
    on(addCustomer, (state ,{customer}) =>{ 
        return [...state ,customer]
    }),
    on(removeCustomer,(state , {customerId})=>{
        return [...state.filter((item)=> item.id != customerId)]

    }),
    on(updateCustomer,(state ,{customerId ,updatedCustomerdata})=>{
        const selectedItemToUpdate= state.findIndex((item)=>item.id ==customerId);
        const newCopy=[...state];
        newCopy[selectedItemToUpdate]=updatedCustomerdata;
        return newCopy;
    })
);

export function CustomerReducer(state: any, action:any) {
    return _CustomerReducer(state, action);
}