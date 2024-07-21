import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';
import { PdfRequest } from 'src/interfaces/intPDF/PdfRequest';

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {

  constructor(private http: HttpClient) { }

  generarPDF(data: PdfRequest): Observable<Blob>{
    return this.http.post<Blob>(`http://127.0.0.1:5000/generate_pdf`,data);
  }

  descargarPdf(blob: Blob, filename: string){
    saveAs(blob,filename);
  }

}
