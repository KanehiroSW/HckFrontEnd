import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UsuarioResponse } from 'src/interfaces/intUsuario/UsuarioResponse';
import { UsuarioService } from '../services/usuario.service';
import { DetalleDiagService } from '../services/detalle-diag.service';
import { DetalleResponse } from 'src/interfaces/intDiagnostico/detalle/DetalleResponse';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  //Inicialización de respuestas esperadas
  Usuario: UsuarioResponse = {
    altura:    0,        apell: '',
    direccion: '',       dni: '',
    edad:      0,        email: '',
    fecha_nac: '',       idUsuario: 0,
    nombre:    '',       peso: 0,
    rol:       0,        sexo: '',
    telefono:  '',       usuario: ''
  };

  DetRespuesta: DetalleResponse = {    
      descripcion: '',   idDetalle: 0,
      imagen: '',        precision: 0,
      recomend: '',      tipo_enfermedad: '',
      fecha_creacion:''    
  }

  IdDiagnostico?: number = 0;

  //Campos a actualizar
  presicion: string = '';
  descripcion: string = '';
  recomend: string = '';
  diagnos: string = '';
  imageURL: string = '';

  constructor(
    private usSvc: UsuarioService,
    private detSvc: DetalleDiagService
  ) { }

  async ngOnInit() {
    const id = localStorage.getItem('idDiagnos');
    if(id){
      this.IdDiagnostico = JSON.parse(id);
    }

    const user = await firstValueFrom(this.usSvc.getAuthenticatedUsuario());
    this.Usuario = { ...user };  

    try {
      let detail = await firstValueFrom(this.detSvc.getOneDetalle(this.IdDiagnostico));

      if(detail){
        this.DetRespuesta = {...detail};
        this.detSvc.getImagen(this.DetRespuesta.imagen)
        this.actualizarVista();
      }

    } catch (error) {
      console.log('No se puedo extraer el detalle: ', error);
    }
  }

  actualizarVista() {
    try {
      let pre = parseFloat((this.DetRespuesta.precision * 100).toFixed(2));
      this.presicion = pre.toString();
      this.descripcion = this.DetRespuesta.descripcion;
      this.recomend = this.DetRespuesta.recomend;
      this.diagnos = this.DetRespuesta.tipo_enfermedad;
      this.imageURL = this.detSvc.getImagen(this.DetRespuesta.imagen)
    } catch (error) {
      console.error('Error al actualizar los campos de vista:', error);
    }
  }

}
