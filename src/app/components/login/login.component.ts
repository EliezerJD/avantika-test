import { Component, OnInit } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password:['',[Validators.required]]
  });

  constructor(private fb: UntypedFormBuilder, private auth: AuthService, private router:Router) { }

  ngOnInit(): void {

  }

  async login(){
    const data = this.loginForm.value;
    await this.auth.login(data.email, data.password).subscribe(res => {
      sessionStorage.setItem(environment.USER_SECRET_KEY, JSON.stringify(res));
      this.router.navigate(['/dashboard']);
    },
    e=> {
      Swal.fire('Ups, algo ha pasado!', e.error.error.message.toString(), 'error');
    });
  }

}
