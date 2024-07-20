import { Component, OnInit } from '@angular/core';
import { LocationService } from './location.service';
import { HospitalService } from './hospital.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  facilities: any[] = [];
  map!: L.Map; // Usamos el operador de aserción no nula para indicar que será inicializado

  constructor(
    private locationService: LocationService,
    private hospitalService: HospitalService
  ) {}

  async ngOnInit() {
    const position = await this.locationService.getCurrentPosition();
    this.hospitalService.getNearbyFacilities(position.lat, position.lng).subscribe((data: any) => {
      this.facilities = data.elements;
      this.addFacilitiesToMap(this.facilities);
    });
    this.initializeMap(position.lat, position.lng);
  }

  initializeMap(lat: number, lng: number) {
    this.map = L.map('map').setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  addFacilitiesToMap(facilities: any[]) {
    facilities.forEach(facility => {
      const marker = L.marker([facility.lat, facility.lon]).addTo(this.map);
      marker.bindPopup(facility.tags.name || facility.tags.amenity || 'Servicio Médico');
    });
  }

  onSearchFacilities() {
    this.ngOnInit();
  }
}
