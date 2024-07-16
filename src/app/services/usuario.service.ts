import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioLogin } from 'src/interfaces/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  loginUser(usLogin: UsuarioLogin){
    return this.http.post('http://127.0.0.1:5000/login',usLogin);
  }
}
