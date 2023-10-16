import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArtClient } from '../api/ArtClient';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import {Client} from "../api/Client";

@Injectable()
export class ArtClientService {

  private artClientsSubject = new BehaviorSubject<ArtClient[]>([]);
  clients$: Observable<ArtClient[]> = this.artClientsSubject.asObservable();
    num=0;

    constructor(private http:HttpClient) {}

    public getArtClients():Observable<Client[]>{
        return this.http.get<Client[]>(environment.backendHost+"/api/clients/dto/");
    }

    deleteArtClientById(id: bigint):Observable<any> {
      const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
      const url = `${environment.backendHost}/api/clients/delete-client/${id}`;

       return this.http.delete<string>(url, httpOptions)
       .pipe(
         catchError(error => {
           console.error('Error deleting client:', error);
           return throwError('Une erreur s\'est produite lors de la suppression du client');
         })
       );
    }




    addNewClient(artClientDto: ArtClient): Observable<string> {
      const url = environment.backendHost + '/api/clients/add-client';
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };


      return this.http.post<any>(url, artClientDto, httpOptions)
        .pipe(
          map(response => {
            if (response) {
              if (response.status === 'success') {
                return 'Le client a été ajouté avec succès';
              } else if (response.error === 'email_exists') {
                return 'Cet email est déjà utilisé';
              }
            } this.artClientsSubject.next([...this.artClientsSubject.value, artClientDto]);

            return 'Une erreur s\'est produite lors de l\'ajout du client';
          }),
          catchError(error => {
            console.log('Error', error);
            throw error;
          })
        );
    }



    updateClient(id: bigint, artClientDto: ArtClient): Observable<any> {
      const url = `${environment.backendHost}/api/clients/update-client/${id}`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };


      return this.http.post<any>(url, artClientDto, httpOptions).pipe(
        tap(() => {

          const updatedClients = this.artClientsSubject.value.map(client => {
            if (client.clientId === id) {
              return { ...client, ...artClientDto };
            }
            return client;
          });

          this.artClientsSubject.next(updatedClients);
        }),
        catchError(error => {
          console.log('Error updating client:', error);
          throw error;
        })
      );
    }





    getClientById(id: bigint):Observable<ArtClient> {

        return this.http.get<ArtClient>(environment.backendHost+"/api/clients/"+id);
    }


}
