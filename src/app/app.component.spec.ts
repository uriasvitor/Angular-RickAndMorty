import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiService } from '../core/services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { CharacterResponse } from '../core/models/character.model';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
      providers: [ApiService]
    }).compileComponents();

  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance
  })

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });


  it('should have an empty input initially', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.value).toBe('');
  });

  it('should have an empty input initially', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.value).toBe('');
  });



});
