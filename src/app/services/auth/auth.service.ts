import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email:any, password:any){
    return this.http.post(environment.AUTH_URL, {email:email, password:password, returnSecureToken:true});
  }
}
