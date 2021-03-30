import { ActivatedRoute, Router } from '@angular/router';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed ,inject,tick,fakeAsync} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AppComponent } from './app.component';
import { OktaAuthService } from '@okta/okta-angular';
import { title } from 'process';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let okta = OktaAuthService;

  beforeEach(async(() => {
    const stubRoute = {
      queryParams: of('')
    };
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [
        AppComponent,
  
        { provide: OktaAuthService },
        {provide: ActivatedRoute, useValue: stubRoute},
        { provide: Router, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(title).toEqual('app');
  });
  it('#closeHelp() should close help', () =>{
    expect('display').toBeFalsy();
  });







});
