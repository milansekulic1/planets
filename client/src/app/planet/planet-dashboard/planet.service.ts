import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Planet} from '../../models/planet.model';

@Injectable({
    providedIn: 'root'
})
export class PlanetService {
    private apiUrl = `${environment.apiUrl}/api/planets`;

    constructor(private http: HttpClient) {
    }

    getPlanets(): Observable<Planet[]> {
        return this.http.get<Planet[]>(this.apiUrl);
    }

    getPlanetById(id: number): Observable<Planet> {
        return this.http.get<Planet>(`${this.apiUrl}/${id}`);
    }

    createPlanet(formData: FormData) {
        return this.http.post<Planet>(`${this.apiUrl}`, formData);
    }

    updatePlanet(formData: FormData, id: number) {
        return this.http.put<Planet>(`${this.apiUrl}/${id}`, formData);
    }

    deletePlanet(id: number) {
        return this.http.delete<Planet>(`${this.apiUrl}/${id}`);
    }
}
