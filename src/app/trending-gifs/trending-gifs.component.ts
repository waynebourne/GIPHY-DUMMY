import { Component, OnInit, HostListener } from '@angular/core';
import { GiphyService } from '../giphy.service';

@Component({
  selector: 'app-trending-gifs',
  templateUrl: './trending-gifs.component.html',
  styleUrls: ['./trending-gifs.component.css']
})
export class TrendingGifsComponent implements OnInit {

  trendingGifs: Array<any> = [];
  offset: number = 0;
  fetchFlag: boolean = true;
  showSpinner: boolean = true;
  actualCount: number = 0;

  constructor(private gifService: GiphyService) { }

  ngOnInit() {
    this.getTrendingGifs();
  }

  getTrendingGifs(offset = 0) {
    this.gifService.getTrending(offset).subscribe((res: any) => {
      if(!this.actualCount){
        this.actualCount = res.pagination.total_count;
      }
      this.fetchFlag = true;
      this.showSpinner = false;
      if (res.data && res.data.length > 0) {
        this.trendingGifs = this.trendingGifs.concat(res.data);
      }
      console.log(res);
    },
      error => {
        console.log(error);
      })
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
      this.offset += 25;
      // alert("Reached end");
      if (this.fetchFlag && this.offset <= this.actualCount) {
        this.showSpinner = true;
        this.getTrendingGifs(this.offset);
        this.fetchFlag = false;
      }
    }
  }

}
