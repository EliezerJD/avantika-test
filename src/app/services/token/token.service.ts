import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken(){
    var data = JSON.parse(sessionStorage.getItem(environment.USER_SECRET_KEY) || '{}');
    return data.idToken;
  }
}
