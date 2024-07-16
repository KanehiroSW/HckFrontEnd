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
    altura:     0,    apell:     '',
    direccion: '',    dni:       '',
    edad:       0,    email:     '',
    fecha_nac: '',    idUsuario:  0,
    nombre:    '',    password:  '',
    peso:       0,    rol:        0,
    sexo:      '',    telefono:  '',
    usuario:   ''
  };
  User = [];

  constructor(
    private usSrv: UsuarioService
  ) { }

  async ngOnInit() {
    // const est = localStorage.getItem('nata')
    // if(est){
    //   this.User = JSON.parse(est);
    // }else{
    //   this.User = []
    // }

    const user = await firstValueFrom(this.usSrv.getOneUsuario(1));

    this.Usuario = {
      altura:     user.altura,       apell:      user.apell,
      direccion:  user.direccion,    dni:        user.dni,
      edad:       user.edad,         email:      user.email,
      fecha_nac:  user.fecha_nac,    idUsuario:  user.idUsuario,
      nombre:     user.nombre,       password:   user.password,
      peso:       user.peso,         rol:        user.rol,
      sexo:       user.sexo,         telefono:   user.telefono,
      usuario:    user.usuario
    }
  }

}
