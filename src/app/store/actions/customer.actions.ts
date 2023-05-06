import { createAction, props } from '@ngrx/store';
import { Customer } from 'src/app/models/customer';

/*
'[add Customer] (patrren) add (action )'  
 props<{customer:Customer}>() payload for action

*/

export enum Types {
  loadCustomer = '[load Customer] load',
  loadCustomer_Success = '[load Customer] success',
  loadCustomer_Error = '[load Customer] error',

  addCustomer = '[add Customer] add',
  addCustomer_Success = '[add Customer] success',
  addCustomer_Error = '[add Customer] error',

  updateCustomer = '[update Customer] update',
  updateCustomer_Success = '[update Customer] success',
  updateCustomer_Error = '[update Customer] error',

  removeCustomer = '[remove Customer] remove',
  removeCustomer_Success = '[remove Customer] success',
  removeCustomer_Error = '[remove Customer] error',
}


//load customer

export const loadCustomer=createAction(Types.loadCustomer);
export const loadCustomerSuccess=createAction(Types.loadCustomer_Success,props<{customers:Customer[]}>());
export const loadCustomerError=createAction(Types.loadCustomer_Error,props<{error:string}>());

// Add customer

export const addCustomer = createAction(
  Types.addCustomer,
  props<{ customer: Customer }>()
);

export const addCustomerSuccess = createAction(
  Types.addCustomer_Success,
  props<{ customer: Customer }>()
);

export const addCustomerError = createAction(
  Types.addCustomer_Error,
  props<{ error: string }>()
);

// update customer

export const updateCustomer = createAction(
 Types.updateCustomer,
  props<{ customerId: any; updatedCustomerdata: Customer }>()
);

export const updateCustomerSuccess = createAction(
    Types.updateCustomer_Success,
     props<{ customerId: any; updatedCustomerdata: Customer }>()
   );

   export const updateCustomerError = createAction(
    Types.updateCustomer_Error,
     props<{ error:string }>()
   );


// remove customer
export const removeCustomer = createAction(
  Types.removeCustomer,
  props<{ customerId: any }>()
);

export const removeCustomerSuccess = createAction(
    Types.removeCustomer,
    props<{ customerId: any }>()
  );

  export const removeCustomerError = createAction(
    Types.removeCustomer,
    props<{ error: string }>()
  );
