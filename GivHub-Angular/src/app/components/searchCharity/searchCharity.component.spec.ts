import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCharityComponent } from './searchCharity.component';

describe('SearchCharityComponent', () => {
  let component: SearchCharityComponent;
  let fixture: ComponentFixture<SearchCharityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCharityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCharityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
