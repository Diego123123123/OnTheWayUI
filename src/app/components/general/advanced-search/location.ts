import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

export class Location{

    constructor(){

    }

    initMap(lat, long) {
        var latLong = String(lat) + ',' + String(long);
        var geocoder = new google.maps.Geocoder;
        this.geocodeLatLng(geocoder, latLong);
    }

    geocodeLatLng(geocoder, latLong) {
        
        var latlngStr = latLong.split(',', 2);
        var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              sessionStorage.setItem("location", results[0].formatted_address);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
    }
}