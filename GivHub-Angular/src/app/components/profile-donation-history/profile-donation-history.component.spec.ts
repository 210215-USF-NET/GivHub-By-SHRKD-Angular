import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDonationHistoryComponent } from './profile-donation-history.component';

describe('ProfileDonationHistoryComponent', () => {
  let component: ProfileDonationHistoryComponent;
  let fixture: ComponentFixture<ProfileDonationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDonationHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDonationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
