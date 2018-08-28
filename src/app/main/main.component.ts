import { Component, OnInit } from '@angular/core';
import { SpotifyAPIService } from '../spotify-api.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Http, Response } from '@angular/http';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [SpotifyAPIService]
})
export class MainComponent implements OnInit {
  artist: any[];
  genres: any[];
  albums: any[];
  token: any[];

  constructor(
    public spotifyAPI: SpotifyAPIService
  ) {}

  ngOnInit() {
    this.spotifyAPI.getToken()
      .subscribe(res => {
        this.spotifyAPI.loadGenres(res.access_token)
          // tslint:disable-next-line:no-shadowed-variable
          .subscribe(res => {
            console.log(res);
            this.genres = res;
    });
  });
  }

  searchAlbums(artist: string) {
    this.spotifyAPI.getToken()
      .subscribe(res => {
        this.spotifyAPI.searchAlbums(artist, res.access_token)
          // tslint:disable-next-line:no-shadowed-variable
          .subscribe(res => {
            this.albums = res.albums.items;
            console.log(this.albums);
          });
      });
    }



}
