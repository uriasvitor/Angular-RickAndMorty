import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { characters } from "../models/character.model";

@Injectable({
  providedIn:'root'
})
export class ApiService {
  private http = inject(HttpClient)

  getAllCharacters():Observable<characters>{
    return this.http.get<characters>(environment.API_URL)
  }

}
