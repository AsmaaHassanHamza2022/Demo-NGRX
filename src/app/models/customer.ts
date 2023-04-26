import { ModalMode } from "../enums/modal.mode";

export interface Customer{
    id?:string,
    firstName:string;
    lastName:string;
    email:string;
    address:string;
    phoneNumber:string;
}

export interface ModalData{
    Mode:ModalMode,
    data:Customer,
}