import { Component, AfterViewInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements AfterViewInit {
  map!: L.Map;
  mapInitialized: boolean = false;

  constructor() {}

  ngAfterViewInit() {
    this.initializeMap();
  }

  async initializeMap() {
    if (this.mapInitialized) {
      return;
    }

    const position = await Geolocation.getCurrentPosition();

    this.map = L.map('map').setView(
      [position.coords.latitude, position.coords.longitude],
      14
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.addMarker(
      position.coords.latitude,
      position.coords.longitude,
      'Mi ubicación'
    );

    this.searchHospitals(position.coords.latitude, position.coords.longitude);

    this.mapInitialized = true;
  }

  addMarker(lat: number, lng: number, title: string) {
    L.marker([lat, lng]).addTo(this.map).bindPopup(title).openPopup();
  }

  searchHospitals(lat: number, lng: number) {
    const query = `
      [out:json];
      node
        [amenity=hospital]
        (around:5000, ${lat}, ${lng});
      out body;
    `;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
      query
    )}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const hospitals = data.elements;
        hospitals.forEach((hospital: any) => {
          this.addMarker(
            hospital.lat,
            hospital.lon,
            hospital.tags.name || 'Hospital'
          );
        });
      })
      .catch((error) => console.error('Error fetching hospitals:', error));
  }
}
