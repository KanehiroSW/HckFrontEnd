import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioLogin } from 'src/interfaces/intUsuario/UsuarioLogin';
import { AuthService } from '../services/Auth.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLoginUser: FormGroup;

  constructor(
    private userSvc: UsuarioService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public fb: FormBuilder,
    private authService: AuthService
  ) {
    this.formLoginUser = this.fb.group({
      usuario: new FormControl("", [Validators.required]),
      pass: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() { }

  async loginUser() {
    var form = this.formLoginUser.value;

    if (this.formLoginUser.invalid) {
      const alert = await this.alertCtrl.create({
        header: 'Faltan datos',
        message: 'Existen campos sin completar',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    const usuario: UsuarioLogin = {
      usuario: form.usuario,
      password: form.pass
    };

    this.userSvc.loginUsuario(usuario).pipe(
      tap(async resp => {
        if (resp.message === "Inicio de sesión exitoso" && resp.usuario) {
          // Assuming you store user details as token
          const userToken = JSON.stringify(resp.usuario);
          this.authService.login(userToken);
          const toast = await this.toastCtrl.create({
            message: 'Inicio de sesión exitoso',
            duration: 1500,
            position: 'bottom'
          });
          await toast.present();
          this.navCtrl.navigateForward('/home');
        } else {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Usuario o contraseña incorrectos',
            buttons: ['Aceptar']
          });
          await alert.present();
        }
      }),
      catchError(async err => {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'No se pudo conectar con el servidor',
          buttons: ['Aceptar']
        });
        await alert.present();
        return of(null);
      })
    ).subscribe();
  }
}