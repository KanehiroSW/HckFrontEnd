import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { DetPostResponse } from 'src/interfaces/intDiagnostico/detalle/DetPostResponse';
import { DetalleDiagService } from '../services/detalle-diag.service';
import { firstValueFrom } from 'rxjs';
import { DiagnosticoService } from '../services/diagnostico.service';
import { UsuarioResponse } from 'src/interfaces/intUsuario/UsuarioResponse';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.page.html',
  styleUrls: ['./diagnostic.page.scss'],
})
export class DiagnosticPage implements OnInit {
  //Botnes de vista
  alertButtons = ['Ok'];
  botonesDesactivados: boolean = true;

  //Variables para manejar imagenes
  imagenSeleccionada: string = '';
  imageFile: File | null = null;

  //Campos de vista
  presicion: string = '';
  descripcion: string = '';
  recomend: string = '';
  diagnos: string = '';

  //Inicialización de respuestas esperadas
  DetRespuesta: DetPostResponse = {
    detalle_diag: {
        descripcion: '',   idDetalle: 0,
        imagen: '',        precision: 0,
        recomend: '',      tipo_enfermedad: ''
    }, message: ''
  }

  Usuario: UsuarioResponse = {
    altura:    0,        apell: '',
    direccion: '',       dni: '',
    edad:      0,        email: '',
    fecha_nac: '',       idUsuario: 0,
    nombre:    '',       peso: 0,
    rol:       0,        sexo: '',
    telefono:  '',       usuario: ''
  };

  constructor(
    private detSvc: DetalleDiagService,
    private diagSvc: DiagnosticoService,
    private usSvc: UsuarioService
  ) {}

  ngOnInit() {}

  async abrirGaleria() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Uri,
      });

      this.imagenSeleccionada = image.webPath ?? '';

      if (this.imagenSeleccionada) {
        this.botonesDesactivados = false;
        //Obtención de archivo imagen
        this.imageFile = await this.convertirURIaFile(this.imagenSeleccionada);
        //Estructura JSON para nuevo detalle
        var postDet = {
          descripcion: 'test',
          recomend:    'test',
          imagen:      this.imageFile
        }
        //Recibimiento de respuesta de servicio POST
        const newDet = await firstValueFrom(this.detSvc.postDetalle(postDet))
        this.DetRespuesta = {...newDet};

        //Obtención de usuario logueado
        const user = await firstValueFrom(this.usSvc.getAuthenticatedUsuario());
        this.Usuario = { ...user }; 

        // //Estructura JSON para diagnostico
        var postDiag = {
          idDetalle: this.DetRespuesta.detalle_diag.idDetalle,
          idUsuario: this.Usuario.idUsuario
        }
        
        // //Unión de detalle a diagnostico
        this.diagSvc.postDiagnostico(postDiag)
        .subscribe(resp => console.log(resp));

        //Actualización de campos de vista
        let pre = parseFloat((this.DetRespuesta.detalle_diag.precision * 100).toFixed(2));
        this.presicion = pre.toString();
        this.descripcion = this.DetRespuesta.detalle_diag.descripcion;
        this.recomend = this.DetRespuesta.detalle_diag.recomend;
        this.diagnos = this.DetRespuesta.detalle_diag.tipo_enfermedad;
      }

      // console.log('Imagen seleccionada: ', this.imagenSeleccionada);
      // console.log('Archivo de imagen: ', this.imageFile);
    } catch (error) {
      console.error('Error al abrir la galería:', error);
    }
  }

  async convertirURIaFile(uri: string): Promise<File> {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileName = uri.substring(uri.lastIndexOf('/') + 1);
    return new File([blob], fileName, { type: blob.type });
  }
}
