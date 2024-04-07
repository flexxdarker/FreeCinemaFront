import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel, CreateFilmModel, FilmModel } from './films';
import { Observable } from 'rxjs';

export const api = "http://localhost:5158/api/Film/";

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient) { }

  get(id: number):Observable<FilmModel> {
    return this.http.get<FilmModel>(api + id);
  }

  getAll(): Observable<FilmModel[]> {
    return this.http.get<FilmModel[]>(api + "all");
  }

  getCategories(): Observable<CategoryModel[]>{
    return this.http.get<CategoryModel[]>(api + "categories");
  }
  
  create(item: FilmModel): Observable<any> {
    const formData = new FormData();

    for (const key in item) {
      formData.append(key, item[key as keyof CreateFilmModel] as string | Blob);
    }

    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return this.http.post(api, formData, { headers: headers });1
  }

  delete(id: number){
    return this.http.delete(api + id);
  }

  edit(model: FilmModel): Observable<any>{
    return this.http.put<FilmModel>(api, model);
  }

}
