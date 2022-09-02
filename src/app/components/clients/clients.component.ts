import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliveryService } from '../../services/delivery/delivery.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients:any = [];
  closeResult = '';
  addClientForm = this.fb.group({
    nombre: ['', [Validators.required]],
    idCliente: ['', [Validators.required]],
    direccion:['',[Validators.required]],
    edad: ['', [Validators.required]],
    genero: ['Masculino', [Validators.required]],
  });
  constructor(private modalService: NgbModal, private fb: FormBuilder, private delivery: DeliveryService) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(){
    this.delivery.getClients().subscribe(res => {
      this.clients= Object.values(res);
    },
    e=> { 
      Swal.fire('Ups, algo ha pasado!', e.error.error.message.toString(), 'error');
    });
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      const data = this.addClientForm.value;
      this.delivery.addClient(data).subscribe(res => {
          Swal.fire('Ok', 'Cliente agregado!', 'success');
          this.addClientForm.reset();
          this.addClientForm.controls.genero.setValue('Masculino');
          this.getClients();
      },
      e=> {
        Swal.fire('Ups, algo ha pasado!', e.error.error.toString(), 'error');
      });
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
