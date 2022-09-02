import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from "@angular/common/http";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SavingsAccountsComponent } from './components/savings-accounts/savings-accounts.component';
import { MovementHistoryComponent } from './components/movement-history/movement-history.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SavingsAccountsComponent,
    MovementHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
