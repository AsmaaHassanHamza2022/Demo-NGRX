import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { removeCustomer } from 'src/app/store/actions/customer.actions';
import { getCustomerByIndex } from 'src/app/store/selectors/customer.selector';
import { AddEditCustomerComponent } from '../add-edit-customer/add-edit-customer.component';
import { ModalMode } from 'src/app/enums/modal.mode';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  public ELEMENT_DATA:Observable<Customer[]>;
  public dataSource:Customer[]=[];
  public dialogConfig:MatDialogConfig= {} as MatDialogConfig;
  public columns = [
    {
      columnDef: 'firstName',
      header: 'First Name',
      cell: (element: Customer) => `${element.firstName}`,
    },
    {
      columnDef: 'lastname',
      header: 'last Name',
      cell: (element: Customer) => `${element.lastName}`,
    },
    {
      columnDef: 'address',
      header: 'Address',
      cell: (element: Customer) => `${element.address}`,
    },
    {
      columnDef: 'email',
      header: 'Email',
      cell: (element: Customer) => `${element.email}`,
    },
    {
      columnDef: 'phoneNumber',
      header: 'Phone Number',
      cell: (element: Customer) => `${element.phoneNumber}`,
    },
    {
      columnDef: 'actions',
      header: 'Actions',
      cell:(element: Customer) => "''",
    },
  ];
  
  displayedColumns = this.columns.map(c => c.columnDef);

  constructor(private store:Store<{customers:Customer[]}>,private dialog: MatDialog) { 
    this.ELEMENT_DATA=this.store.pipe(select('customers')); 
    this.ELEMENT_DATA.subscribe((customerList:Customer[])=>{
      this.dataSource=customerList;
    })
  }

  ngOnInit(): void {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width='50%';
  }

  onAddNewCustomer(){
    this.dialogConfig.data={
      Mode:ModalMode.AddMode,
      data:null,
    }
    this.dialog.open(AddEditCustomerComponent, this.dialogConfig);
  }

  onEdit(CustomerData:any){
    this.dialogConfig.data={
      Mode:ModalMode.EditMode,
      data:CustomerData,
    }
    this.dialog.open(AddEditCustomerComponent, this.dialogConfig);
  }

  onDelete(customerIndex:number){
    this.store.dispatch(removeCustomer({customerId:customerIndex
    }))
  }

  onPreview(customerId:number){
    this.store.select(getCustomerByIndex(customerId)).pipe(take(1)).subscribe((customer)=>{
      this.dialogConfig.data={
        Mode:ModalMode.PreviewMode,
        data:customer,
      }
      
      this.dialog.open(AddEditCustomerComponent, this.dialogConfig);
    })
  }
}
