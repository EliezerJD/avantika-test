import { Component, OnInit } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {

  }

  async login(){
    if(!this.loginForm.valid)return;
    const data = this.loginForm.value;
    await this.auth.login(data.email, data.password).subscribe(res => {
      //guardar token y redirigir a inicio
    },
    e=> {
      Swal.fire('Oops', e.error.error.message.toString(), 'error');
    });
  }

}
