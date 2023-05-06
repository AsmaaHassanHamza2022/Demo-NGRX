import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/compat/firestore'
import { map, of, take, tap } from 'rxjs';
import { Customer } from '../models/customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(public afs:AngularFirestore) { }

   documentToItem = (x: DocumentChangeAction<any>):any => {
    const data = x.payload.doc.data();
    return {
        id: x.payload.doc.id,
        ...data
    };
};


  getAllCustomers(){
     return this.afs.collection('Customers').snapshotChanges()
     .pipe(
      take(1),
      map((items)=>items.map((item)=>this.documentToItem(item)))
    )

  }

  AddNewCustomer(newCustomerData:Customer){
    return of(this.afs.collection('Customers').add({...newCustomerData}))
  }

  UpdateCustomerData(CustomerId:string ,updatedCustomerData:Customer){
    return of(this.afs.collection('Customers').doc(CustomerId).set(updatedCustomerData));

  }

  DeleteCustomer(customerId:string){
    return of(this.afs.collection('Customers').doc(customerId).delete());
  }
}
