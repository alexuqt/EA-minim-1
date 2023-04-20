import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Location } from '../models/location';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
    url = 'http://localhost:4002/locations';

    constructor(private http: HttpClient) { }

    getLocations(page: number, limit:number): Observable<{locations: Location[], totalPages:number}> {
        const url = `${this.url}/all?page=${page}&limit=${limit}`;
        return this.http.get<any>(url).pipe(
            map(res=>{
                return{
                    locations: res.docs,
                    totalPages: res.totalPages
                }
            })
        );
    }

    getLocation(id?: string): Observable<Location> {
        return this.http.get<Location>(this.url + '/' + id);
    } 

    addLocation(location: Location): Observable<Location>{
        return this.http.post<Location>(this.url, location);
    }

    editLocation(id?: string, Location?: Location): Observable<Location> {
        return this.http.put<Location>(this.url + '/' + id, Location);
    }

    deleteLocation(id?: string): Observable<Location> {
        return this.http.delete<Location>(this.url + '/' + id);
    }

}