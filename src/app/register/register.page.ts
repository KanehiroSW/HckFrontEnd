import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formSignUpUser: FormGroup;

  constructor(
    private userSvc: UsuarioService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    public alertCrl: AlertController,
    public fb: FormBuilder
  ) { 
    this.formSignUpUser = this.fb.group({
      'docId': new FormControl("",Validators.required),
      'nombres': new FormControl("",Validators.required),
      'apell': new FormControl("",Validators.required),
      'telefono': new FormControl("",Validators.required),
      'edad': new FormControl("",Validators.required),
      'direc': new FormControl("",Validators.required),
      'user': new FormControl("",Validators.required),
      'email': new FormControl("",[Validators.required, Validators.email]),
      'pass': new FormControl("",Validators.required),
      'sexo': new FormControl("",Validators.required),
      'fecha_nac': new FormControl("",Validators.required),
      'peso': new FormControl("",Validators.required),
      'altura': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
  }


  async registrarUsuario(){

    var form = this.formSignUpUser?.value;

    if(this.formSignUpUser?.invalid){
      const alert = await this.alertCrl.create({
        header: 'Faltan datos',
        message: 'Existen campos sin completar',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    var Usuario = {
      altura: form.altura,
      apell: form.apell,
      direccion: form.direc,
      dni: form.docId,
      edad: form.edad,
      email: form.email,
      fecha_nac: form.fecha_nac,
      nombre: form.nombres,
      password: form.pass,
      peso: form.peso,
      rol: 0,
      sexo: form.sexo,
      telefono: form.telefono,
      usuario: form.user
    }

    this.userSvc.postUsuario(Usuario)
    .subscribe(resp => {
      console.log(resp);
    })

    const toast = await this.toastCtrl.create({
      message: 'Se registró con éxito',
      duration: 1500,
      position: 'bottom'
    });
    await toast.present();

    this.navCtrl.navigateBack('/login');

  }

}
