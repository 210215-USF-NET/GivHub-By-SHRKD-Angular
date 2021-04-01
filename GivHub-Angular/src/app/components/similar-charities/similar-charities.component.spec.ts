import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarCharitiesComponent } from './similar-charities.component';

describe('SimilarCharitiesComponent', () => {
  let component: SimilarCharitiesComponent;
  let fixture: ComponentFixture<SimilarCharitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimilarCharitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarCharitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
