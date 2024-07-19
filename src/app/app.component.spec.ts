import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiService } from '../core/services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiServiceMock } from '../mock/service.mock';
import { characters } from '../mock/character.mock';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let service: jasmine.SpyObj<ApiServiceMock>;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiServiceMock', ['getAllCharacters']);

    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
      providers: [ApiService, {useValue:apiServiceSpy}],
    }).compileComponents();

    service = TestBed.inject(ApiServiceMock) as jasmine.SpyObj<ApiServiceMock>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it("Should search input starts with nothing inputed", ()=>{
    const inputElement = fixture.nativeElement.querySelector("#search")
    expect(inputElement.textContent).toBe('')
  })

  it("Should recive a list of characters", ()=>{
    const allCharacters =  service.getAllCharacters()

    expect(allCharacters.length).toBe(characters.length)

    allCharacters.forEach((element, index) =>{
      expect(element.id).withContext("Should contain the id").toBe(characters[index].id)
      expect(element.name).withContext("Should contain a name").toBe(characters[index].name)
      expect(element.origin.name).withContext("Should contain a origin name").toBe(characters[index].origin.name)
      expect(element.location.name).withContext("Should contain a location name").toBe(characters[index].location.name)
      expect(element.species).withContext("Should contain a species").toBe(characters[index].species)
      expect(element.status).withContext("Should contain a status").toBe(characters[index].status)
    })
  })

});
