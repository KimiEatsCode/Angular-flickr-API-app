import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

//Ajax is basically is a concept to client-side script that communicates between the server and the client machine to perform any type of operations


//To define a class as a service in Angular, use the @Injectable() decorator to provide the metadata that allows Angular to inject it into a component as a dependency. Similarly, use the @Injectable() decorator to indicate that a component or other class (such as another service, a pipe, or an NgModule) has a dependency.

export interface FlickrPhoto {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
}

export interface FlickrOutput {
  photos: {
    photo: FlickrPhoto[];
  }
}

@Injectable({
  providedIn: 'root'
})


export class FlickrService {
prevKeyword: string;
currPage = 1;

constructor(private http: HttpClient) {};

search_keyword(keyword:string) {

if(this.prevKeyword === keyword) {
  this.currPage++;
  console.log(this.currPage)
} else {
  this.currPage = 1;
}


const url = (`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${environment.flickr.key }&text=${keyword}&per_page=24&page=1&format=json&nojsoncallback=true`)


this.prevKeyword = keyword;

return this.http.get(url).pipe(map((res:FlickrOutput) => {
const urlArr = [];
// console.log(JSON.stringify(res));

res.photos.photo.forEach((ph: FlickrPhoto) => {

const photoObj = {
  url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}`,
  title: ph.title
};

urlArr.push(photoObj);

});

return urlArr;

}));

}

}



