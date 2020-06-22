import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GiphyService } from '../giphy.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  actualQueryString: string;
  encodedQueryString: string;
  searchResults: Array<any> = [];
  fetchFlag: boolean = true;
  offset: number = 0;
  paginationResults : any;
  showSpinner : boolean = true;

  constructor(private route: ActivatedRoute, private gifService: GiphyService) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.actualQueryString = routeParams.queryString.replace(/-/g, ' ');
      this.encodedQueryString = encodeURIComponent(this.actualQueryString);
      this.getSearchResults(0);
    });
  }

  getSearchResults = (offset: number = 0) => {
    this.gifService.getSearchResults(this.encodedQueryString, offset).subscribe((res: any) => {
      if(offset === 0){
        this.searchResults = [];
        this.paginationResults = res.pagination;
      }
      this.fetchFlag = true;
      this.showSpinner = false;
      if(res.data && res.data.length > 0){
        this.searchResults = this.searchResults.concat(res.data);
      }
      console.log(res);
    });
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
      this.offset += 25;
      // alert("Reached end");
      if (this.fetchFlag && this.offset <= this.paginationResults.total_count) {
        this.showSpinner = true;
        this.getSearchResults(this.offset);
        this.fetchFlag = false;
      }
    }
  }
}
