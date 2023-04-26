import { createAction, props } from "@ngrx/store";
import { Customer } from "src/app/models/customer";

/*
'[add Customer] (patrren) add (action )'  
 props<{customer:Customer}>() payload for action

*/
export const addCustomer=createAction(
    '[add Customer] add',
    props<{customer:Customer}>());

export const updateCustomer=createAction(
    '[update Customer] update',
    props<{customerId:any,updatedCustomerdata:Customer}>());
    


export const removeCustomer=createAction(
    '[remove Customer] remove',
    props<{customerId:any}>());