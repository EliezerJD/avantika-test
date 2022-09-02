import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  constructor(private http: HttpClient, private token: TokenService) {}

  getSavingsAccounts(){
    return this.http.get(environment.ACCOUNTS_URL + this.token.getToken());
  }

  getRecords(){
    return this.http.get(environment.RECORDS_URL + this.token.getToken());
  }

  addRecord(data:any){
    return this.http.post(environment.RECORDS_URL + this.token.getToken(), {usuario:data.usuario, numeroCuenta:data.numeroCuenta, monto:data.monto, terminal: data.terminal, tipo:data.tipo, fechaUltimaAct:data.fechaUltimaAct});
  }

  addSavingAccount(data:any){
    return this.http.post(environment.ACCOUNTS_URL + this.token.getToken(), {idCliente:data.idCliente, numeroCuenta:data.numeroCuenta, saldo:data.saldo, estado: data.estado, fechaUltimaAct:data.fechaUltimaAct});
  }

  getClients(){
    return this.http.get(environment.CLIENTS_URL);
  }

  addClient(data:any){
    return this.http.post(environment.CLIENTS_URL, {idCliente:data.idCliente, nombre:data.nombre, direccion:data.direccion, edad: data.edad, genero:data.genero});
  }

}
