import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { CustomerReducer } from './store/reducers/customer.reducers';
import { CustomerListComponent } from './customer-management/customer-list/customer-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';

import { AddEditCustomerComponent } from './customer-management/add-edit-customer/add-edit-customer.component';
import { HeaderComponent } from './layout/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    AddEditCustomerComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({customers:CustomerReducer}),
    BrowserAnimationsModule,
    ReactiveFormsModule,

    //angular material component
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
