import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  URLstring = environment.apiURL;
  
  constructor(public Http: HttpClient) { }

  getCharacterListDetails(url:any): Observable<any> {
    if (url) {
      var tempurl = `${url}`;
      return this.Http.get(tempurl);
    } else {
      var tempurl = `${this.URLstring}` + `people/`;
      return this.Http.get(tempurl);
    }
   
  }
  getCharacterDetails(url:any): Observable<any> {
    var tempurl = `${url}`;
    return this.Http.get(tempurl);
  }
  getCharacterSpecies(url:any): Observable<any> {
    var tempurl = `${url}`;
    return this.Http.get(tempurl);
  }
  getCharacterParentName(url:any): Observable<any> {
    var tempurl = `${url}`;
    return this.Http.get(tempurl);
  }

  getMovies(): Observable<any> {
    var tempurl = `${this.URLstring}` + `films/`;
    return this.Http.get(tempurl);
  }
  getSpecies():Observable<any>{
    var tempurl=`${this.URLstring}` + `species/`;
    return this.Http.get(tempurl);
  }
  getMoviesDetails(url:any): Observable<any> {
    var tempurl = `${url}`;
    return this.Http.get(tempurl);
  }
  getVehicleDetails(url:any): Observable<any> {
    var tempurl = `${url}`;
    return this.Http.get(tempurl);
  }
  getStarShipsDetails(url:any): Observable<any> {
    var tempurl = `${url}`;
    return this.Http.get(tempurl);
  }
}

