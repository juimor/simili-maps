import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  map: any;
  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [ 48.856614, 2.3522219],
      zoom: 13,
      zoomControl: false,
      attributionControl: false
    });
    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);
    
    let tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    this.addTilesToMap(tile);
  }
  
  
  addTilesToMap(tile: any){
    tile.addTo(this.map);
  } 
}