import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrengthMeterComponent } from './strength-meter.component';

describe('StrengthMeterComponent', () => {
  let component: StrengthMeterComponent;
  let fixture: ComponentFixture<StrengthMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StrengthMeterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrengthMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
