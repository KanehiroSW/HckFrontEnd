import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginResponse } from 'src/interfaces/intUsuario/LoginResponse';
import { UsuarioLogin } from 'src/interfaces/intUsuario/UsuarioLogin';
import { UsuarioResponse } from 'src/interfaces/intUsuario/UsuarioResponse';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }


  getAllUsuarios(): Observable<UsuarioResponse[]>{
    return this.http.get<UsuarioResponse[]>
    ('http://127.0.0.1:5000/usuario');
  }

  getOneUsuario(id: number): Observable<UsuarioResponse>{
    return this.http.get<UsuarioResponse>
    (`http://127.0.0.1:5000/usuario/${id}`)
  }

  postUsuario(nUser: UsuarioResponse): Observable<string>{
    return this.http.post<{messsage: string}>
    ('http://127.0.0.1:5000/usuario',nUser)
    .pipe(map(response => response.messsage));
  }

  loginUser(usLogin: UsuarioLogin): Observable<LoginResponse>{
    return this.http.post<LoginResponse>
    ('http://127.0.0.1:5000/login',usLogin);
  }
}
