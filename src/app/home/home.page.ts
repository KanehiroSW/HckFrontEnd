import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from '../services/Auth.service';  // Asegúrate de importar el servicio de autenticación

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController,
    private authService: AuthService  // Inyecta el servicio de autenticación
  ) {}

  ngOnInit() {}

  abrirWhatsApp() {
    const phoneNumber = '+51984773566';
    const message = 'Hola, ¿me puedes ayudar?';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  async cerrarSesion() {
    const actionSheet = await this.actionSheetController.create({
      header: '¿Estás seguro?',
      buttons: [
        {
          text: 'Sí',
          role: 'destructive',
          handler: () => {
            this.authService.logout();  // Llama al método de cierre de sesión del servicio de autenticación
            this.router.navigate(['/login']);  // Redirige al usuario a la página de inicio de sesión
          },
        },
        {
          text: 'No',
        },
      ],
    });
    await actionSheet.present();
  }
}