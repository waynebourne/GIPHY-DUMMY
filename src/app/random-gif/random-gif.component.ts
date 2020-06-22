import { Component, OnInit } from '@angular/core';
import { GiphyService } from '../giphy.service';

@Component({
  selector: 'app-random-gif',
  templateUrl: './random-gif.component.html',
  styleUrls: ['./random-gif.component.css']
})
export class RandomGifComponent implements OnInit {

  randomGif : any;
  showSpinner: boolean = true;

  constructor(private gifService : GiphyService) { }

  ngOnInit() {
    this.getRandomGif();
  }

  getRandomGif() {
    this.gifService.getRandomGif().subscribe((res: any) => {
      this.randomGif = res;
      setTimeout(() => {this.showSpinner = false;},1000);
      console.log(res);
    });
  }

}
