import { ICountry } from './../models/iCountry';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getAllCountries():Observable<ICountry[]>{
    return this.http.get<ICountry[]>('https://restcountries.com/v3.1/all');
  }
  getCountryByName(value:string):Observable<ICountry[]>{
    return this.http.get<ICountry[]>(`https://restcountries.com/v3.1/name/${value}`);
  }
  getCountryByRegion(region:string):Observable<ICountry[]>{
    return this.http.get<ICountry[]>(`https://restcountries.com/v3.1/region/${region}`);
  }
  getCountryByFullName(fullName:string):Observable<ICountry[]>{
    return this.http.get<ICountry[]>(`https://restcountries.com/v3.1/name/${fullName}?fullText=true`);
  }
  getCountryByCode(borders:string[]):Observable<ICountry[]>{
    return this.http.get<ICountry[]>(`https://restcountries.com/v3.1/alpha?codes=${borders.join(',')}`);
  }
}
