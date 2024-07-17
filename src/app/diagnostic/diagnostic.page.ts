import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { DetPostResponse } from 'src/interfaces/intDiagnostico/detalle/DetPostResponse';
import { DetalleDiagService } from '../services/detalle-diag.service';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.page.html',
  styleUrls: ['./diagnostic.page.scss'],
})
export class DiagnosticPage implements OnInit {
  alertButtons = ['Ok'];
  imagenSeleccionada: string = '';
  imageFile: File | null = null;
  botonesDesactivados: boolean = true;

  DetRespuesta: DetPostResponse = {
    detalle_diag: {
        descripcion: '',
        idDetalle: 0,
        imagen: '',
        precision: 0,
        recomend: '',
        tipo_enfermedad: ''
    },
    message: ''
  }

  constructor(private detSvc: DetalleDiagService) {}

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
        this.imageFile = await this.convertirURIaFile(this.imagenSeleccionada);

        var post = {
          descripcion: 'test',
          recomend:    'test',
          imagen:      this.imageFile
        }

        this.detSvc.postDetalle(post)
        .subscribe(resp => console.log(resp));

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
