import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentView = 0;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  changeCurrentView(view:number){
    this.currentView = view;
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);

  }

}
