import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Picture } from '../interfaces/picture';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { NasaApi } from '../interfaces/nasa-api';

@Injectable({
  providedIn: 'root'
})
export class NAPOD {

  private readonly http = inject(HttpClient);

  getPicOfToday(): Observable<Picture> {
    return this.http.get<Picture>(`${environment.NASA_API_BASE_URL}/planetary/apod?api_key=${environment.NASA_API_KEY}`)
  }

  searchForVideos(query: string){
    return this.http.get<NasaApi>(`${environment.NASA_API_IMAGE_BASE_URL}/search?q=${query}`)
  }

  getAssetDetail(nasaId: string){
    return this.http.get<NasaApi>(`${environment.NASA_API_IMAGE_BASE_URL}/search?q=${query}`)
    //  https://images-api.nasa.gov/asset/GSFC_20120420_SDO_m10966_Year2
  }


}
