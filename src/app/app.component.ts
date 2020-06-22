import { Component, OnInit } from '@angular/core';
import { GiphyService } from './giphy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  trendingGifs : any;
  queryString: string;

  constructor(private gifService: GiphyService, private router: Router){
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  onClickSearch(){
    let modifiedQueryString = this.queryString.split(/\s+/).join('-');
    console.log(modifiedQueryString);
    this.router.navigate(['search', modifiedQueryString]);
  }
}
