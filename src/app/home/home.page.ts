import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';


declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  mapRef = null;

  @ViewChild('map', { static: true } ) mapElement: ElementRef;
  map: any;
  markers = [];

  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController
  ) {

  }

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {
    //const loading = await this.loadingCtrl.create();
    //loading.present();
    console.log(this.mapElement);
    const myLatLng = await this.getLocation();
    const mapEle: HTMLElement = document.getElementById('map');
    this.map = new google.maps.Map(this.mapElement.nativeElement,{
      center: myLatLng,
      zoom: 12
    });
    
    /*this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
   */ google.maps.event
    .addListenerOnce(this.map, 'idle', () => {
    //  loading.dismiss();
      //this.addMaker(myLatLng.lat, myLatLng.lng);
    });
  }

/*  private addMaker(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      title: 'Hello World!'
    });
  }*/

  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

}
