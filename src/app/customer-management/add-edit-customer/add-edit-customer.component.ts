import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ModalMode } from 'src/app/enums/modal.mode';
import { Customer, ModalData } from 'src/app/models/customer';
import {
  addCustomer,
  updateCustomer,
} from 'src/app/store/actions/customer.actions';
import { regex } from 'src/app/utilities/regex';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.scss'],
})
export class AddEditCustomerComponent implements OnInit {
  public form: FormGroup;
  public modalMode: ModalMode = ModalMode.AddMode;
  public modalData: ModalData;
  public ModalMode: typeof ModalMode = ModalMode;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private store: Store<{ customers: Customer[] }>
  ) {

    this.modalData = data;

    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(regex.email)]],
      address: ['', [Validators.required]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(regex.numbers)],
      ],
    });

  }

  ngOnInit(): void {
    this.checkModalMode();
  }

  public onAddNewCustomer() {
    const randomId = Math.floor(Math.random() * Date.now()).toString(16);
    this.store.dispatch(
      addCustomer({ customer: { ...this.form.value, id: randomId } })
    );
    this.onCancle();
  }

  public onEditCustomerDate() {
    this.store.dispatch(
      updateCustomer({
        customerId: this.modalData.data.id,
        updatedCustomerdata: { ...this.form.value, id: this.modalData.data.id },
      })
    );
    this.onCancle();
  }

  public onCancle() {
    this.dialogRef.close();
  }

  public checkModalMode() {
    switch (this.modalData?.Mode) {
      case ModalMode.AddMode:
        this.modalMode = ModalMode.AddMode;
        break;
      case ModalMode.EditMode:
        this.modalMode = ModalMode.EditMode;
        this.setData();
        break;
      case ModalMode.PreviewMode:
        this.modalMode = ModalMode.PreviewMode;
        this.setData();
        break;
    }
  }

  setData() {
    if (this.modalData) {
      this.form.controls['firstName'].setValue(this.modalData.data.firstName);
      this.form.controls['lastName'].setValue(this.modalData.data.lastName);
      this.form.controls['email'].setValue(this.modalData.data.email);
      this.form.controls['address'].setValue(this.modalData.data.address);
      this.form.controls['phoneNumber'].setValue(
        this.modalData.data.phoneNumber
      );
    }
  }
}
