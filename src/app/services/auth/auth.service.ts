import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email:string, password:string){
    return this.http.post(environment.AUTH_URL, {email:email, password:password, returnSecureToken:true});
  }
}
