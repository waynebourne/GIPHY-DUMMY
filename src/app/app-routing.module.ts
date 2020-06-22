import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrendingGifsComponent } from './trending-gifs/trending-gifs.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { RandomGifComponent } from './random-gif/random-gif.component';

const routes: Routes = [
  { path: 'trending', component: TrendingGifsComponent },
  { path: '', redirectTo: '/trending', pathMatch: 'full' },
  { path: 'search/:queryString', component: SearchResultsComponent },
  { path: 'random', component: RandomGifComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
