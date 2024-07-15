import { Component, OnInit } from '@angular/core';
import { CameraResultType } from '@capacitor/camera';

import { Camera } from '@capacitor/camera';
@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.page.html',
  styleUrls: ['./diagnostic.page.scss'],
})
export class DiagnosticPage implements OnInit {
  alertButtons = ['Ok'];
  imagenSeleccionada: string = '';
  constructor() {}

  ngOnInit() {}

  async abrirGaleria() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
      });

      this.imagenSeleccionada = image.webPath ?? '';

      console.log('Imagen seleccionada:', this.imagenSeleccionada);
    } catch (error) {
      console.error('Error al abrir la galería:', error);
    }
  }
}
