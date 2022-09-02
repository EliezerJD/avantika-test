import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  data:any = [];
  constructor(private http: HttpClient) {
    this.data = JSON.parse(sessionStorage.getItem(environment.USER_SECRET_KEY) || '{}');
  }

  getSavingsAccounts(){
    return this.http.get(environment.ACCOUNTS_URL + this.data.idToken);
  }

  getRecords(){
    return this.http.get(environment.RECORDS_URL + this.data.idToken);
  }

  addRecord(data:any){
    return this.http.post(environment.RECORDS_URL + this.data.idToken, {usuario:data.usuario, numeroCuenta:data.numeroCuenta, monto:data.monto, terminal: data.terminal, tipo:data.tipo, fechaUltimaAct:data.fechaUltimaAct});
  }

  addSavingAccount(data:any){
    return this.http.post(environment.ACCOUNTS_URL + this.data.idToken, {idCliente:data.idCliente, numeroCuenta:data.numeroCuenta, saldo:data.saldo, estado: data.estado, fechaUltimaAct:data.fechaUltimaAct});
  }

  getClients(){
    return this.http.get(environment.CLIENTS_URL);
  }

  addClient(data:any){
    return this.http.post(environment.CLIENTS_URL, {idCliente:data.idCliente, nombre:data.nombre, direccion:data.direccion, edad: data.edad, genero:data.genero});
  }

}
