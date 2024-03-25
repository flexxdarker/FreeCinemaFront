import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilmResponseModel } from './films';
import { Observable } from 'rxjs';

export const api = "https://localhost:7081/api/Film/all";

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<FilmResponseModel> {
    return this.http.get<FilmResponseModel>(api);
  }
}
