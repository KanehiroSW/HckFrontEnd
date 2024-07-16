import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DetalleResponse } from 'src/interfaces/intDiagnostico/detalle/DetalleResponse';
import { DetPostRequest } from 'src/interfaces/intDiagnostico/detalle/DetPostRequest';
import { DetPostResponse } from 'src/interfaces/intDiagnostico/detalle/DetPostResponse';

@Injectable({
  providedIn: 'root'
})
export class DetalleDiagService {

  constructor(private http:HttpClient) { }

  getAllDetalles(): Observable<DetalleResponse[]>{
    return this.http.get<DetalleResponse[]>
    ('http://127.0.0.1:5000/detalle_diag');
  }

  getOneDetalle(id: number): Observable<DetalleResponse>{
    return this.http.get<DetalleResponse>
    (`http://127.0.0.1:5000/detalle_diag/${id}`)
  }

  postDetalle(nDet: DetPostRequest): Observable<DetPostResponse>{
    return this.http.post<DetPostResponse>
    ('http://127.0.0.1:5000/detalle_diag',nDet)
  }

}
