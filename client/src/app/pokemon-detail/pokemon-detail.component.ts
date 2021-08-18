import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  id: string = '';
  pokemon: any = {};

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.pokemonService.getDetails(this.id).subscribe(resp => {
      this.pokemon = resp;
    })
  }

}
