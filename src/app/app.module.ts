import { AuthInterceptor } from './services/authinterceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { LocationService } from './location/location.service';
import { HospitalService } from './location/hospital.service';

@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule],
  providers: [
    { provide:RouteReuseStrategy, useClass:IonicRouteStrategy },LocationService, HospitalService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
