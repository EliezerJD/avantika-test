import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery/delivery.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movement-history',
  templateUrl: './movement-history.component.html',
  styleUrls: ['./movement-history.component.css']
})
export class MovementHistoryComponent implements OnInit {
  record:any = [];
  constructor(private delivery: DeliveryService, private router: Router) { }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords(){
    this.delivery.getRecords().subscribe(res => {
      this.record= Object.values(res);
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

}
