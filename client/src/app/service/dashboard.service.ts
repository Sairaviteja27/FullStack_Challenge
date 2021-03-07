import { Injectable } from '@angular/core';
import { APIConstants } from '../api/apiconstants';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }
  public getData(status): Observable<any> {  
    return this.http.post(APIConstants.SEARCH, status);
}
public getAllData(): Observable<any> {  
  return this.http.get(APIConstants.GETALLDATA);
}
}
