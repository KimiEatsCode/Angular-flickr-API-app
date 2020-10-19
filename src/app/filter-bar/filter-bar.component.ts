import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../services/flickr.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

  images = [];
  keyword: string;

  constructor(private flickrService: FlickrService) { }


  ngOnInit() {
  }

  search(event: any, word:string) {
    alert(word)
this.keyword = word;
    if (this.keyword && this.keyword.length > 0) {
      this.flickrService.search_keyword(this.keyword)
      .toPromise()
      .then(res => {
        this.images = res;
      });
    }
  }

}
