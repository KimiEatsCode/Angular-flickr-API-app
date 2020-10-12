import { Component, Injectable } from '@angular/core';
import { FlickrService } from './services/flickr.service';

//When you register a provider at the component level, you get a new instance of the service with each new instance of that component. At the component level, register a service provider in the providers property of the @Component() metadata.

//A dependency doesn't have to be a service—it could be a function, for example, or a value.



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [FlickrService]
})
export class AppComponent {

constructor(private flickrAPI: FlickrService) {

  console.log(flickrAPI)


}


  title = 'my-app';


}
