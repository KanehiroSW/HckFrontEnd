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
  map!: L.Map; 

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
    const iconRetinaUrl = 'assets/leaflet/marker-icon-2x.png';
    const iconUrl = 'assets/leaflet/marker-icon.png';
    const shadowUrl = 'assets/leaflet/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = iconDefault;

    if (this.map) {
      this.map.off();
      this.map.remove();
    }

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
