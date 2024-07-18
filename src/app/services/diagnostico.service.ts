import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DiagnosticoResponse } from 'src/interfaces/intDiagnostico/DiagnosticoResponse';
import { DiagUserResponse } from 'src/interfaces/intDiagnostico/DiagUserResponse';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {

  constructor(private http: HttpClient) { }

  getAllDiagnosticos(): Observable<DiagnosticoResponse[]>{
    return this.http.get<DiagnosticoResponse[]>
    ('http://127.0.0.1:5000/diagnostico');
  }

  getOneDiagnostico(id: number): Observable<DiagnosticoResponse>{
    return this.http.get<DiagnosticoResponse>
    (`http://127.0.0.1:5000/diagnostico/${id}`)
  }

  getDiagByUser(id?: number): Observable<DiagUserResponse[]>{
    return this.http.get<DiagUserResponse[]>
    (`http://127.0.0.1:5000/diagnostico/usuario/${id}`);
  }

  postDiagnostico(nDiag: DiagnosticoResponse): Observable<string>{
    return this.http.post<{messsage: string}>
    ('http://127.0.0.1:5000/diagnostico',nDiag)
    .pipe(map(response => response.messsage));
  }

}
