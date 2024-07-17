import { Component, OnInit } from '@angular/core';
import { UsuarioResponse } from 'src/interfaces/intUsuario/UsuarioResponse';
import { UsuarioService } from '../services/usuario.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  Usuario: UsuarioResponse = {
    altura: 0,
    apell: '',
    direccion: '',
    dni: '',
    edad: 0,
    email: '',
    fecha_nac: '',
    idUsuario: 0,
    nombre: '',
    peso: 0,
    rol: 0,
    sexo: '',
    telefono: '',
    usuario: ''
  };

  constructor(private usSrv: UsuarioService) { }

  async ngOnInit() {
    try {
      const user = await firstValueFrom(this.usSrv.getAuthenticatedUsuario());
      this.Usuario = { ...user };
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      if (error.status === 401) {
        console.log('Unauthorized, redirect to login.');
        // Redirigir al login si no está autorizado
        // this.navCtrl.navigateRoot('/login'); // Asegúrate de tener `NavController` inyectado si usas esto
      }
    }
  }
}