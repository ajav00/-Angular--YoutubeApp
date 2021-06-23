import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { YouTubeResponse } from '../models/youtube-response.interface';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apikey = 'AIzaSyAUY0_6lVcnz1OanocwhkujZIs7U5__dJA';
  private playlist = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';

  constructor(private hhtp: HttpClient) { }

  getVideos(){
    const url = `${this.youtubeUrl}/playlistItems`;
    const params = new HttpParams()
    .set('part', 'snippet')
    .set('maxResults', '10')
    .set('playlistId', this.playlist)
    .set('key', this.apikey)
    .set('nextPageToken', this.nextPageToken);

    return this.hhtp.get<YouTubeResponse>(url, {params})
    .pipe(
      map(resp =>{
        this.nextPageToken = resp.nextPageToken;
        return resp.items;
      }),
      map(items =>{
        return items.map( video => video.snippet );
      })
    );
  }
}
