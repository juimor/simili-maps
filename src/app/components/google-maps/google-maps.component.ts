import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { bounds } from 'leaflet';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements AfterViewInit {
  @ViewChild('mapSearchField') mapSearchField!: ElementRef;
  @ViewChild(GoogleMap) map!: GoogleMap;

  display: any;
  zoom = 13;
  center: google.maps.LatLngLiteral = {
      lat: 48.856614,
      lng:  2.3522219
  };

  constructor() {}
  ngAfterViewInit(): void {
    this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(this.mapSearchField.nativeElement);
    const searchBox = new google.maps.places.SearchBox(this.mapSearchField.nativeElement);
    
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places!.length === 0) return;
      
      const bounds = new google.maps.LatLngBounds();
      places!.forEach(place => {
        if (!place.geometry || !place.geometry.location) return;
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds)
      console.log(places)
      console.log(bounds)
    })
  }


}