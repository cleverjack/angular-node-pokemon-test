import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  private baseURI: string = 'http://localhost:3000/api';

  getList(params: {page?: number, limit?: number} = {page: 0, limit: 10}) {
    return this.http.get<any>(`${this.baseURI}/pokemons?limit=${params.limit}&page=${params.page}`);
  }

  getDetails(id: string) {
    return this.http.get<any>(`${this.baseURI}/pokemon/${id}`);
  }
}
