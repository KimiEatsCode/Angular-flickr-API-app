import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Ajax is basically is a concept to client-side script that communicates between the server and the client machine to perform any type of operations

@Injectable({
  providedIn: 'root'
})
export class FlickrService {

//To define a class as a service in Angular, use the @Injectable() decorator to provide the metadata that allows Angular to inject it into a component as a dependency. Similarly, use the @Injectable() decorator to indicate that a component or other class (such as another service, a pipe, or an NgModule) has a dependency.

data: any;

  constructor(private http: HttpClient) {


   };

   getFlickrImages() {
      this.http.get('https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=APIKEY&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1'
        ).subscribe((data) => this.data = data);

        console.log(this.data);
   }







}
