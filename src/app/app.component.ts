import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {AsyncPipe, CommonModule} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../core/services/api.service';
import { MatInputModule } from '@angular/material/input';
import { characters } from '../core/models/character.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, MatCardModule, MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  error = false;
  control = new FormControl('');
  characters: characters[] = [];
  filtredCharacters = new BehaviorSubject<any[]>([]);

  private readonly apiService = inject(ApiService);


  ngOnInit() {
    this.getCharacters();

    this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCards(value || ''))
    ).subscribe(filtered => this.filtredCharacters.next(filtered));
  }

  getCharacters(){
    this.apiService.getAllCharacters().subscribe({
      next:(value)=>{
        this.characters = value.results;
        this.filtredCharacters.next(this.characters);
      },
      error:err=>{
        this.error = true;
        throw new err("an error occurred", err)
      }

    })
  }

  private filterCards(value:string){
    return this.characters.filter(characters => characters.name.toLocaleLowerCase().includes(value.toLowerCase()));
  }

  getEpisodeNumbers(episodes: string[]): string[] {
    return episodes.map(url => {
      const parts = url.split('/');
      return parts[parts.length - 1];
    });
  }


}
