import { Component, OnInit } from '@angular/core';
import { DiagnosticoService } from '../services/diagnostico.service';
import { DiagUserResponse } from 'src/interfaces/intDiagnostico/DiagUserResponse';
import { firstValueFrom } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioResponse } from 'src/interfaces/intUsuario/UsuarioResponse';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  Diagnosticos: DiagUserResponse[] = []
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
    private usSvc: UsuarioService,
    private diagSvc: DiagnosticoService
  ) { }

  async ngOnInit() {

    const user = await firstValueFrom(this.usSvc.getAuthenticatedUsuario());
    this.Usuario = { ...user };    

    this.diagSvc.getDiagByUser(this.Usuario.idUsuario)
    .subscribe(diags => {
      this.Diagnosticos.push(...diags);
    })
  }

}
