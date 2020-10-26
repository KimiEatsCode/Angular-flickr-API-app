import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


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


const url = (`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${environment.flickr.key }&license=2%2C3%2C4%2C5%2C6%2C9&text=${keyword}&per_page=24&page=1&format=json&nojsoncallback=true`)


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



