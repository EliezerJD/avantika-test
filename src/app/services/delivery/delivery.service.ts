import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  getSavingsAccounts(){
    var data = JSON.parse(sessionStorage.getItem(environment.USER_SECRET_KEY) || '{}');
    return this.http.get(environment.SAVINGS_ACCOUNTS_URL + data.idToken);
  }

  getRecords(){
    var data = JSON.parse(sessionStorage.getItem(environment.USER_SECRET_KEY) || '{}');
    return this.http.get(environment.RECORDS_URL + data.idToken);
  }

}
