import { character } from './../mock/character.mock';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BehaviorSubject, Subscription} from 'rxjs';
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

export class AppComponent implements OnDestroy {

  control = new FormControl('');
  characters: characters[] = [];
  error = false;
  nextPage = ''
  filtredCharacters = new BehaviorSubject<any[]>([]);

  private readonly apiService = inject(ApiService);
  private readonly subscriptions = new Subscription();

  ngOnInit() {
    this.getCharacters();

    const controlSubscription = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCards(value || ''))
    ).subscribe(filtered => this.filtredCharacters.next(filtered));


    this.subscriptions.add(controlSubscription);

  }

  getCharacters(){
    this.apiService.getAllCharacters().subscribe({
      next:(value)=>{
        this.nextPage = value.info.next;
        this.characters = value.results;
        this.filtredCharacters.next(this.characters);
      },
      error:err=>{
        this.error = true;
        throw new err("An error occurred", err)
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

  handlerPagination(e:Event){
    if(!e){
      return console.error("Not a event")
    }

    if(!this.nextPage){
      return console.log("Next page not found", this.nextPage)
    }
    const paginationSubscription = this.apiService.getCharactersByPage(this.nextPage).subscribe({
      next:(value) =>{
        this.nextPage = value.info.next;
        this.characters = [...this.characters, ...value.results];
        this.filtredCharacters.next(this.characters);
      },
      error:(err) =>{
          this.error = true;
          throw new err("An error occurred", err)
      },
    })

    this.subscriptions.add(paginationSubscription)
    console.log(this.nextPage)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
