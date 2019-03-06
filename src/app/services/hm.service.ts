import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { catchError, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Player } from '../objects/player'
import { Stat } from '../objects/stat';

@Injectable({
  providedIn: 'root',
})
export class HMService {

  public ownPlayersLicenceNumber : string[];

  constructor(private http: HttpClient) { 
    this.ownPlayersLicenceNumber = [
      // Gardien
      '1929',   // Conz
      '2163', // Nyffeler
      // Défenseurs
      '2201', // Zryd
      '2200', // Zgraggen
      '1962', // Burren
      '1958', // Andersson
      '1984', // Egli
      '2008', // Paschoud
      '2164', // Büsser
      '2165', // Gähler
      // Attaquants
      '1972', // Arcobello	
      '1994', // Pouliot
      '1995', // Rajala
      '1972', // Berger
      '2157', // Walker
      '1977', // Ebbett
      '1993', // Brunner
      '1989', // Tanner
      '1938', // Goi
      '2133', // Bertschy
      '2230', // Bachofner
      '2125', // Traber
    ];
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>('/api/RealPlayers/list')
      .pipe(
        //map(data => (data.filter((p : any) => this.ownPlayersLicenceNumber.some(v => v == p.id )).map(item => Player.fromJson(item)))),
        map(data => (data.filter((p : any) => this.ownPlayersLicenceNumber.some(v => true)).map(item => Player.fromJson(item)))),
        catchError(this.handleError('getPlayers', []))
      );
  }

  getPlayersStats(): Observable<Stat[]> {
    return this.http.get<Player[]>('/api/RealPlayers/stats')
      .pipe(
        // map(data => (data.filter((p : any) => this.ownPlayersLicenceNumber.some(v => v == p.id)).map(item => Stat.fromJson(item)))),
        map(data => (data.filter((p : any) => this.ownPlayersLicenceNumber.some(v => true)).map(item => Stat.fromJson(item)))),
        catchError(this.handleError('getPlayersStats', []))
      );
  }

  saveStat(data : Player[]): any {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post('http://localhost:8080/HockeyManager/save.php',data,{ headers: headers })
      .pipe(
        map(data => data),
        catchError(this.handleError('saveStat', []))
      )
  }

  getStat(): any {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.get('http://localhost:8080/HockeyManager/getData.php')
      .pipe(
        map(data => data),
        catchError(this.handleError('getStat', []))
      )
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<any> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
	  
	  return;
    };
  }
}


