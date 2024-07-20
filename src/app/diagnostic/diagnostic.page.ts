import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { DetPostResponse } from 'src/interfaces/intDiagnostico/detalle/DetPostResponse';
import { DetalleDiagService } from '../services/detalle-diag.service';
import { firstValueFrom } from 'rxjs';
import { DiagnosticoService } from '../services/diagnostico.service';
import { UsuarioResponse } from 'src/interfaces/intUsuario/UsuarioResponse';
import { UsuarioService } from '../services/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.page.html',
  styleUrls: ['./diagnostic.page.scss'],
})
export class DiagnosticPage implements OnInit {
  //Botones de vista
  alertButtons = ['Ok'];
  desDesactivado: boolean = true;
  consDesactivado: boolean = true;
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
        recomend: '',      tipo_enfermedad: '',
        fecha_creacion:''
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
    public alertCrl: AlertController,
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
        this.consDesactivado = false;
        await this.procesarImagen(this.imagenSeleccionada, 2);
      }
    } catch (error) {
      console.error('Error al abrir la galería:', error);
    }
  }

  async conservar() {
    try {
      if (this.imagenSeleccionada) {
        await this.procesarImagen(this.imagenSeleccionada, 1);
        this.desDesactivado = false
        // console.log('DetRespuesta después de procesar imagen:', this.DetRespuesta);
      }

      const user = await firstValueFrom(this.usSvc.getAuthenticatedUsuario());
      this.Usuario = { ...user };
      
      //Estructura JSON para diagnostico
      const postDiag = {
        idDetalle: this.DetRespuesta.detalle_diag.idDetalle,
        idUsuario: this.Usuario.idUsuario
      };
      
      //Union de detalle a diagnostico
      this.diagSvc.postDiagnostico(postDiag)
        .subscribe(resp => console.log(resp));

      this.mostrarAlerta();
    } catch (error) {
      console.log('Error al guardar el diagnóstico:', error);
    }
  }

  descargar() {
    //Aca va la logica para el pdf
  }

  async procesarImagen(imagePath: string, opc: number) {
    try {
      this.imageFile = await this.convertirURIaFile(imagePath);

      const postDet = {
        descripcion: 'test',
        recomend:    'test',
        imagen:      this.imageFile
      };

      let newDet;
      if (opc === 1) {
        newDet = await firstValueFrom(this.detSvc.postDetalle(postDet));
      } else if (opc === 2) {
        newDet = await firstValueFrom(this.detSvc.createDetalle(postDet));
      }
      
      if (newDet) {
        this.DetRespuesta = { ...newDet };
        // console.log('DetRespuesta en procesarImagen:', this.DetRespuesta);
      }

      this.actualizarVista();
    } catch (error) {
      console.error('Error al procesar la imagen y detalle:', error);
    }
  }

  async convertirURIaFile(uri: string): Promise<File> {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileName = uri.substring(uri.lastIndexOf('/') + 1);
    return new File([blob], fileName, { type: blob.type });
  }

  actualizarVista() {
    try {
      let pre = parseFloat((this.DetRespuesta.detalle_diag.precision * 100).toFixed(2));
      this.presicion = pre.toString();
      this.descripcion = this.DetRespuesta.detalle_diag.descripcion;
      this.recomend = this.DetRespuesta.detalle_diag.recomend;
      this.diagnos = this.DetRespuesta.detalle_diag.tipo_enfermedad;
    } catch (error) {
      console.error('Error al actualizar los campos de vista:', error);
    }
  }

  async mostrarAlerta(){
    const alert = await this.alertCrl.create({
      header: 'Conservación exitosa',
      message: 'Su diagnostico se ha guardado correctamente',
      buttons: ['Aceptar']
    });
    await alert.present();
    return;
  }
}
