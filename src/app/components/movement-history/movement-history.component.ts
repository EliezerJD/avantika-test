import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery/delivery.service';

@Component({
  selector: 'app-movement-history',
  templateUrl: './movement-history.component.html',
  styleUrls: ['./movement-history.component.css']
})
export class MovementHistoryComponent implements OnInit {
  record:any = [];
  constructor(private delivery: DeliveryService) { }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords(){
    this.delivery.getRecords().subscribe(res => {
      this.record= Object.values(res);
    },
    error=> {
      console.log(error.message);
    });
  }

}
