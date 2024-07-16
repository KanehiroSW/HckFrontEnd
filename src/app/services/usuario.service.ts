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

  private baseUrl: string = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getAllUsuarios(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(`${this.baseUrl}/usuario`);
  }

  getOneUsuario(id: number): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.baseUrl}/usuario/${id}`);
  }

  postUsuario(nUser: UsuarioResponse): Observable<string> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/usuario`, nUser)
      .pipe(map(response => response.message));
  }

  loginUsuario(usLogin: UsuarioLogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, usLogin);
  }
}