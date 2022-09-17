import { IFavorite } from './../../models/favorite';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FavoriteStateSelector } from 'src/app/store/selectors';
import { AppState } from 'src/app/store/reducer';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favorite:Observable<IFavorite>;

  constructor(private readonly store:Store<AppState>) { }

  ngOnInit() {
    this.favorite = this.store.select(state=>FavoriteStateSelector(state));
  }
}
