import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { characters } from './character.mock';

@Injectable({
  providedIn:'root'
})
export class ApiServiceMock {
  getAllCharacters() {
    return characters;
  }
}
