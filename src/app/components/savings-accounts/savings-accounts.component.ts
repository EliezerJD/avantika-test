import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery/delivery.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-savings-accounts',
  templateUrl: './savings-accounts.component.html',
  styleUrls: ['./savings-accounts.component.css']
})
export class SavingsAccountsComponent implements OnInit {
  accounts:any = [];
  closeResult = '';
  tipo = null;
  recordForm = this.fb.group({
    usuario: ['', [Validators.required]],
    numeroCuenta:['',[Validators.required]],
    monto: ['', [Validators.required]],
    terminal: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    fechaUltimaAct: ['', [Validators.required]],
  });
  addAccountForm = this.fb.group({
    idCliente: ['', [Validators.required]],
    numeroCuenta:['',[Validators.required]],
    saldo: ['', [Validators.required]],
    estado: ['Activa', [Validators.required]],
    fechaUltimaAct: ['', [Validators.required]],
  });
  constructor(private delivery: DeliveryService, private modalService: NgbModal, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getSavingsAccounts();
  }

  getSavingsAccounts(){
    this.delivery.getSavingsAccounts().subscribe(res => {
      this.accounts= Object.values(res);
    },
    e=> {
      if(e.error.error== 'Auth token is expired'){
        Swal.fire({  
          title: 'La sesión ha expirado, ingresa de nuevo',  
          confirmButtonText: `Ok`,  
        }).then((result) => {  
          this.logout();
        });
      }else{
        Swal.fire('Ups, algo ha pasado!', e.error.error.message.toString(), 'error');
      }
    });
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  open(content:any, tipo:any, numeroCuenta:any) {
    let date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    if(tipo!=null){
      this.recordForm.reset();
      this.tipo = tipo;
      this.recordForm.controls.tipo.setValue(tipo);
      this.recordForm.controls.numeroCuenta.setValue(numeroCuenta);
      this.recordForm.controls.fechaUltimaAct.setValue(date);
    }else{
      this.addAccountForm.controls.fechaUltimaAct.setValue(date);
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(tipo!=null){
        const data = this.recordForm.value;
        this.delivery.addRecord(data).subscribe(res => {
          Swal.fire('Ok', this.tipo+' realizado!', 'success');
        },
        e=> {
          Swal.fire('Ups, algo ha pasado!', e.error.error.toString(), 'error');
        });
      }else{
        const data = this.addAccountForm.value;
        this.delivery.addSavingAccount(data).subscribe(res => {
          Swal.fire('Ok', 'Cuenta de ahorro creada!', 'success');
          this.addAccountForm.reset();
          this.addAccountForm.controls.estado.setValue('Activa');
          this.getSavingsAccounts();
        },
        e=> {
          Swal.fire('Ups, algo ha pasado!', e.error.error.toString(), 'error');
        });

      }
      
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
