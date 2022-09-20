import { LoadFavorites } from './../../store/actions';
import { IFavorite } from './../../models/favorite';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { FavoriteStateSelector, UserIdSelector } from 'src/app/store/selectors';
import { AppState } from 'src/app/store/reducer';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit,OnDestroy {
  favorite: IFavorite;

  constructor(private readonly store: Store<AppState>) {}
  favSub:Subscription;

  ngOnInit() {
    this.store.select((state) => FavoriteStateSelector(state)).subscribe((favorite:IFavorite)=>{
      this.favorite=favorite;
    });
    this.favSub=this.store.select((state)=>UserIdSelector(state)).subscribe((userId:string)=>{
      this.store.dispatch(LoadFavorites({userId}));
    });
  }


  ngOnDestroy(): void {
    this.favSub?.unsubscribe();
  }


}
