import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
    constructor(private http: HttpClient) {}
  
    getNearbyFacilities(lat: number, lng: number) {
      const overpassUrl = `
        https://overpass-api.de/api/interpreter?data=[out:json];
        (
          node["amenity"="hospital"](around:5000,${lat},${lng});
          node["amenity"="clinic"](around:5000,${lat},${lng});
          node["amenity"="doctors"](around:5000,${lat},${lng});
        );
        out;
      `;
      return this.http.get(overpassUrl);
    }
  }