import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/services/pokemon.service';

export interface IPokemon {
  name: string;
  url: string;
  
}

export interface IPokemanResp {
  count: number,
  next: string,
  previous: string,
  results: []
}

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit {

  constructor(private pokemonService: PokemonService, private router: Router,) { }

  displayedColumns: string[] = ['name', 'url', 'action'];
  dataSource: IPokemon[] = [];
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  totalCount: number = 0;

  ngOnInit(): void {
    this.pokemonService.getList().subscribe((resp: IPokemanResp) => {
      this.dataSource = resp.results;
      this.totalCount = resp.count;
    })
  }

  changePageInfo(e: any): void {
    let params = {
      page: e.pageIndex,
      limit: e.pageSize
    }

    this.pokemonService.getList(params).subscribe((resp: IPokemanResp) => {
      this.dataSource = resp.results;
      this.totalCount = resp.count;
    })
  }

  goDetailPage(row: IPokemon): void {
    console.log(row)
    let id = row.url.replace("https://pokeapi.co/api/v2/pokemon/", '');
    id = id.replace('/', '');

    this.router.navigate([`/${id}`]);
  }
}
