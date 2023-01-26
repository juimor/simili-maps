import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { PlaceSearchResult } from 'src/app/models/PlaceSearchResult';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements AfterViewInit {
  @ViewChild('mapSearchField') mapSearchField!: ElementRef;
  @ViewChild('addToFavoritesBtn') addToFavoritesBtn!: ElementRef;
  @ViewChild('addToTestBtn') addToTestBtn!: ElementRef;
  @ViewChild(GoogleMap) map!: GoogleMap;

  display: any;
  zoom = 13;
  center: google.maps.LatLngLiteral = {
      lat: 48.856614,
      lng:  2.3522219
  };
  placeTmp: any;
  displayAddBtn: boolean = false;

  constructor() {}
  ngAfterViewInit(): void {
    this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(this.mapSearchField.nativeElement);
    this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(this.addToFavoritesBtn.nativeElement);
    this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(this.addToTestBtn.nativeElement);
    const searchBox = new google.maps.places.SearchBox(this.mapSearchField.nativeElement);
    
    searchBox.addListener('places_changed', () => {
      this.displayAddBtn = true;
      const places = searchBox.getPlaces();
      if (places!.length === 0) return;
      const bounds = new google.maps.LatLngBounds();

      places!.forEach(place => {
        console.log(place)
        this.placeTmp.addressName = place.formatted_address;
        this.placeTmp.location = place.geometry?.location;
        console.log(this.placeTmp)
        if (!place.geometry || !place.geometry.location) return;
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds)
    })
  }

  saveAddress(category: string) {
    if (category === 'favorites'){
      console.log(this.placeTmp)
    } else {

    }
  }

}