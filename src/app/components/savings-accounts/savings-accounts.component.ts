import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery/delivery.service';

@Component({
  selector: 'app-savings-accounts',
  templateUrl: './savings-accounts.component.html',
  styleUrls: ['./savings-accounts.component.css']
})
export class SavingsAccountsComponent implements OnInit {
  accounts:any = [];
  constructor(private delivery: DeliveryService) { }

  ngOnInit(): void {
    this.getSavingsAccounts();
  }

  getSavingsAccounts(){
    this.delivery.getSavingsAccounts().subscribe(res => {
      this.accounts= Object.values(res);
    },
    error=> {
      console.log(error.message);
    });
  }
}
